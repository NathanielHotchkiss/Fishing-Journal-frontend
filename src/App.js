import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import config from "./config";
import TokenService from "./services/token-service";

export const UserContext = React.createContext({});

export default function App() {
  const [apiError, setApiError] = useState(null);
  const [fishingLogsData, setFishingLogsData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tackleData, setTackleData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);

  async function handleApiCalls() {
    setIsLoading(true);

    if (TokenService.hasAuthToken()) {
      const user_id = TokenService.getUserId();

      await Promise.all([
        fetch(`${config.API_ENDPOINT}/fishing_logs/user/${user_id}`, {
          headers: {
            Authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }),

        fetch(`${config.API_ENDPOINT}/species/user/${user_id}`, {
          headers: {
            Authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }),

        fetch(`${config.API_ENDPOINT}/tackle/user/${user_id}`, {
          headers: {
            Authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }),

        fetch(`${config.API_ENDPOINT}/app_users/${user_id}`, {
          headers: {
            Authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        }),
      ])

        .then(([logsRes, speciesRes, tackleRes, userInfoRes]) => {
          if (!logsRes.ok) {
            return logsRes.json().then((e) => Promise.reject(e));
          }

          if (!speciesRes.ok) {
            return speciesRes.json().then((e) => Promise.reject(e));
          }

          if (!tackleRes.ok) {
            return tackleRes.json().then((e) => Promise.reject(e));
          }

          if (!userInfoRes.ok) {
            return userInfoRes.json().then((e) => Promise.reject(e));
          }

          return Promise.all([
            logsRes.json(),
            speciesRes.json(),
            tackleRes.json(),
            userInfoRes.json(),
          ]);
        })

        .then(([logs, species, tackle, user]) => {
          setFishingLogsData(logs);
          setSpeciesData(species);
          setTackleData(tackle);
          setUserInfo(user);
          setIsLoading(false);
        })

        .catch(setApiError);
    }
  }

  const context = {
    fishingLogsData: fishingLogsData,
    setFishingLogsData: setFishingLogsData,
    setApiError: setApiError,
    apiError: apiError,
    handleApiCalls: handleApiCalls,
    userInfo: userInfo,
    tackleData: tackleData,
    speciesData: speciesData,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={context}>
      <AppRoutes />
    </UserContext.Provider>
  );
}
