import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
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
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/app_users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateUser(user) {
    const { user_id } = user;
    return fetch(`${config.API_ENDPOINT}/app_users/${user_id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteUser(user_id) {
    return fetch(`${config.API_ENDPOINT}/app_users/${user_id}`, {
      method: "DELETE",
      headers: {
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
  postNewLog(fish) {
    return fetch(`${config.API_ENDPOINT}/fishing_logs`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(fish),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  updateLog(fish) {
    const { fish_id } = fish;
    return fetch(`${config.API_ENDPOINT}/fishing_logs/${fish_id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
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
};

export default AuthApiService;
