import React from "react";

export default React.createContext({
  fishing_logs: [],
  style: "",
  userId: "",
  findFishingLog: () => {},
  handleToken: () => {},
  handleUpdateUserThings: () => {},
});
