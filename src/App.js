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

        .then(([userLogsRes, userTackleRes, userInfoRes]) => {
          if (!userLogsRes.ok) {
            return userLogsRes.json().then((e) => Promise.reject(e));
          }

          if (!userTackleRes.ok) {
            return userTackleRes.json().then((e) => Promise.reject(e));
          }

          if (!userInfoRes.ok) {
            return userInfoRes.json().then((e) => Promise.reject(e));
          }

          return Promise.all([
            userLogsRes.json(),
            userTackleRes.json(),
            userInfoRes.json(),
          ]);
        })

        .then(([logs, tackle, user]) => {
          setFishingLogsData(logs);
          setTackleData(tackle);
          setUserInfo(user);
          setIsLoading(false);
        })

        .catch(setApiError);
    }
  }

  const context = {
    fishingLogsData: fishingLogsData,
    setApiError: setApiError,
    apiError: apiError,
    handleApiCalls: handleApiCalls,
    userInfo: userInfo,
    tackleData: tackleData,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={context}>
      <AppRoutes />
    </UserContext.Provider>
  );
}
