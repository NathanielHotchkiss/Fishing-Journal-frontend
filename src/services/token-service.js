import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  saveUserId(user_id) {
    window.localStorage.setItem("user_id", user_id);
  },
  saveFirstName(first_name) {
    window.localStorage.setItem("first_name", first_name);
  },
  getFirstName() {
    return window.localStorage.getItem("first_name");
  },
  saveLastName(last_name) {
    window.localStorage.setItem("last_name", last_name);
  },
  getLastName() {
    return window.localStorage.getItem("last_name");
  },
  saveEmail(email) {
    window.localStorage.setItem("email", email);
  },
  getEmail() {
    return window.localStorage.getItem("email");
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
