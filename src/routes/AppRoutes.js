import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewLog from "../pages/NewLog";
import NotFound from "../components/NotFound";
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import UserSettings from "../pages/UserSettings";
import Stats from "../pages/Stats";
import config from "../config";
import TokenService from "../services/token-service";
import Protected from "../components/Protected";

export const UserContext = React.createContext({});

export default function AppRoutes() {
  const [apiError, setApiError] = useState(null);
  const [fishingLogsData, setFishingLogsData] = useState([]);

  async function handleApiCalls() {
    if (TokenService.hasAuthToken()) {
      const user_id = TokenService.getUserId();

      await Promise.all([
        fetch(`${config.API_ENDPOINT}/fishing_logs/user/${user_id}`, {
          headers: {
            Authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }),
      ])
        .then(([userLogsRes]) => {
          if (!userLogsRes.ok) {
            return userLogsRes.json().then((e) => Promise.reject(e));
          }
          return Promise.all([userLogsRes.json()]);
        })

        .then(([logs]) => {
          setFishingLogsData(logs);
        })

        .catch((error) => {
          setApiError(error);
        });
    }
  }

  const app_user = {
    fishingLogsData: fishingLogsData,
    setApiError: setApiError,
    apiError: apiError,
    handleApiCalls: handleApiCalls,
  };

  return (
    <UserContext.Provider value={app_user}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/new"
            element={
              <Protected>
                <NewLog />
              </Protected>
            }
          />
          <Route
            path="/fishing_logs/:fish_id/edit"
            element={
              <Protected>
                <NewLog edit={true} />
              </Protected>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route
            path="/stats"
            element={
              <Protected>
                <Stats />
              </Protected>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
