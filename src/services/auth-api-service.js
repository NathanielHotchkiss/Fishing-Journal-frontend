import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/app_users/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postLogin({ email, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postNewLog(user) {
    return fetch(`${config.API_ENDPOINT}/fishing_logs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateLog(fish) {
    return fetch(`${config.API_ENDPOINT}/fishing_logs/:fish_id`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fish),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteLog(fish_id) {
    return fetch(`${config.API_ENDPOINT}/fishing_logs/${fish_id}`, {
      method: "DELETE",
      headers: {
        fish_id,
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res;
    });
  },
  getLogs() {
    if (TokenService.hasAuthToken()) {
      const user_id = TokenService.getUserId();

      return fetch(`${config.API_ENDPOINT}/fishing_logs/user/${user_id}`, {
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      }).then(([userLogsRes]) => {
        if (!userLogsRes.ok) {
          return userLogsRes.json().then((e) => Promise.reject(e));
        }
        return Promise.all([userLogsRes.json()]);
      });
    }
  },
};

export default AuthApiService;
