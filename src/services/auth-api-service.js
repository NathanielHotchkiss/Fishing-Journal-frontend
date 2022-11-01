import config from "../config";
import TokenService from "./token-service";

const AuthApiService = {
  postLogin({ email, password }) {
    email = email.toLowerCase();

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

  getItem(type, id) {
    return fetch(`${config.API_ENDPOINT}/${type}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  listItems(type, user_id) {
    return fetch(`${config.API_ENDPOINT}/${type}/user/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  postItem(object, type) {
    return fetch(`${config.API_ENDPOINT}/${type}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(object),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  updateItem(object, id, type) {
    return fetch(`${config.API_ENDPOINT}/${type}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(object),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deleteItem(id, type) {
    return fetch(`${config.API_ENDPOINT}/${type}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res;
    });
  },

  postImage(image, fish_id) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("fish_id", fish_id);

    return fetch(`${config.API_ENDPOINT}/fish_images`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },

      body: formData,
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default AuthApiService;
