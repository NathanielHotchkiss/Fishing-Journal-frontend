const API_ENDPOINT =
  process.env.NODE_ENV === "PRODUCTION"
    ? "https://fishing-journal-server.herokuapp.com"
    : "http://localhost:5050";

export default { API_ENDPOINT, TOKEN_KEY: "fishing-client-auth-token" };
