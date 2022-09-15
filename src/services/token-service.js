import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  saveUserId(user_id) {
    window.localStorage.setItem("user_id", user_id);
  },
  getUserId() {
    return window.localStorage.getItem("user_id");
  },
  clearEverything() {
    window.localStorage.clear();
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
};

export default TokenService;
