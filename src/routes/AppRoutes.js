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

export const UserContext = React.createContext({});

export default function AppRoutes() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fishingLogsData, setFishingLogsData] = useState([]);

  console.log(isLoggedIn);

  async function handleApiCalls() {
    if (TokenService.hasAuthToken()) {
      const user_id = TokenService.getUserId();
      setUserId(user_id);

      await Promise.all([
        fetch(`${config.API_ENDPOINT}/fishing_logs/${user_id}`, {
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
    userId: userId,
    setUserId: setUserId,
    firstName: firstName,
    lastName: lastName,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    fishingLogsData: fishingLogsData,
    setApiError: setApiError,
    apiError: apiError,
    setFishingLogsData: setFishingLogsData,
    handleApiCalls: handleApiCalls,
  };

  return (
    <UserContext.Provider value={app_user}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<NewLog />} />
          <Route
            path="/fishing_logs/:fish_id/edit"
            element={<NewLog edit={true} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/stats" element={<Stats />} />
          <Route
            path="/signin"
            element={<SignIn />}
            setFirstName={setFirstName}
            setLastName={setLastName}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
