import React, { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

export const UserContext = React.createContext({});

export default function App() {
  const [apiError, setApiError] = useState(null);
  const [fishingLogsData, setFishingLogsData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tackleData, setTackleData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);

  const context = {
    fishingLogsData: fishingLogsData,
    setFishingLogsData: setFishingLogsData,
    setApiError: setApiError,
    apiError: apiError,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    tackleData: tackleData,
    setTackleData: setTackleData,
    speciesData: speciesData,
    setSpeciesData: setSpeciesData,
    setIsLoading: setIsLoading,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={context}>
      <AppRoutes />
    </UserContext.Provider>
  );
}
