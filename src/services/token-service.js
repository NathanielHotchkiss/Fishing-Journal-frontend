import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  setHasVisited() {
    window.localStorage.setItem("hasVisited", true);
  },
  getHasVisited() {
    return window.localStorage.getItem("hasVisited");
  },
  saveEmail(email) {
    window.localStorage.setItem("email", email);
  },
  getEmail() {
    return window.localStorage.getItem("email");
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
  saveUserId(user_id) {
    window.localStorage.setItem("user_id", user_id);
  },
  getUserId() {
    return window.localStorage.getItem("user_id");
  },
  clearAll() {
    const items = [
      "email",
      "first_name",
      "last_name",
      "user_id",
      config.TOKEN_KEY,
    ];
    items.forEach((item) => window.localStorage.removeItem(item));
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
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
};

export default TokenService;
