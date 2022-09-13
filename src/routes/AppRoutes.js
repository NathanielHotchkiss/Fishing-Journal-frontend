import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthApiService from "../services/auth-api-service";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewLog from "../pages/NewLog";
import NotFound from "../components/NotFound";
import Protected from "../components/Protected";
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import Stats from "../pages/Stats";
import UserSettings from "../pages/UserSettings";

export const UserContext = React.createContext({});

export default function AppRoutes() {
  const [apiError, setApiError] = useState(null);
  const [fishingLogsData, setFishingLogsData] = useState([]);

  async function handleApiCalls() {
    return AuthApiService.getLogs()

      .then(([logs]) => {
        setFishingLogsData(logs);
      })

      .catch((error) => {
        setApiError(error);
      });
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
