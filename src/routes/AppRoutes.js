import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NewLog from "../pages/NewLog";
import NotFound from "../components/NotFound";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import Stats from "../pages/Stats";
import Context from "../contexts/UserContext";
import config from "../config";
import TokenService from "../services/token-service";
import Home from "../pages/Home";

export default function AppRoutes() {
  const [fishingLogsData, setFishingLogsData] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const UserContext = React.createContext();

  // const handleUpdateUserThings = async (userId) => {
  //   await Promise.all([
  //     fetch(`${config.API_ENDPOINT}/dinner/fishing_logs`, {
  //       headers: {
  //         Authorization: `bearer ${TokenService.getAuthToken()}`,
  //       },
  //     }),
  //   ])

  //     .then(([userLogsRes]) => {
  //       if (!userLogsRes.ok) {
  //         return userLogsRes.json().then((e) => Promise.reject(e));
  //       }

  //       return Promise.all([userLogsRes.json()]);
  //     })

  //     .then(([userLogsRes]) => {
  //       setFishingLogsData(userLogsRes);
  //     })

  //     .catch((error) => {
  //       this.setState({ error });
  //     });
  // };

  useEffect(
    () =>
      async function handleApiCalls() {
        if (TokenService.hasAuthToken()) {
          setLoggedIn(true);

          const userId = TokenService.getUserId();

          setUserId(userId);

          await Promise.all([fetch(`${config.API_ENDPOINT}/fishing_logs`)])
            .then(([userLogsRes]) => {
              if (!userLogsRes.ok) {
                return userLogsRes.json().then((e) => Promise.reject(e));
              }

              return Promise.all([userLogsRes.json()]);
            })

            .then(([logs]) => {
              const userLogs = logs.filter((log) => log.user_id === null);

              setFishingLogsData(userLogs);
            })

            .catch((error) => {
              setApiError(error);
            });
        }

        const handleToken = async () => {
          TokenService.hasAuthToken()
            ? this.setState({ loggedIn: true })
            : this.setState({
                loggedIn: false,
                userRecipes: [],
                userRestaurants: [],
                userId: 0,
                wheelOptions: [],
              });

          const userId = TokenService.getUserId();

          this.setState({ userId });
        };
      }
  );

  return (
    <UserContext.Provider
      value={{
        fishingLogsData,
        userId,
        findFishingLog: () => {},
        handleToken: () => {},
        handleUpdateUserThings: () => {},
      }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                fishingLogsData={fishingLogsData}
                apiError={apiError}
              />
            }
          />
          <Route path="/new" element={<NewLog />} />
          <Route
            path="/fishing_logs/:fish_id/edit"
            element={<NewLog edit={true} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stats" element={<Stats />} logsData={fishingLogsData} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
