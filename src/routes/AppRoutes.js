import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewLog from "../pages/NewLog";
import NotFound from "../components/NotFound";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import config from "../config";
import TokenService from "../services/token-service";

export const UserContext = React.createContext({});

export default function AppRoutes() {
  const [fishingLogsData, setFishingLogsData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleUpdateUserThings = async (user_id) => {
    await Promise.all([
      fetch(`${config.API_ENDPOINT}/fishing_logs/${user_id}`, {
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }),
    ])

      .then(([response]) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }

        return Promise.all([response.json()]);
      })

      .then(([response]) => {
        setFishingLogsData(response);
      })

      .catch((error) => {
        this.setState({ error });
      });
  };

  async function handleApiCalls() {
    if (TokenService.hasAuthToken()) {
      setLoggedIn(true);

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
    loggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    userId: userId,
    setUserId: setUserId,
    fishingLogsData: fishingLogsData,
    setFishingLogsData: setFishingLogsData,
    handleUpdateUserThings: handleUpdateUserThings,
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
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
