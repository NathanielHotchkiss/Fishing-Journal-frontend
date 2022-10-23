const API_ENDPOINT =
  process.env.NODE_ENV === "PRODUCTION"
    ? "https://fishing-journal-server.herokuapp.com"
    : "http://localhost:5050";

const TOKEN_KEY = "fishing-client-auth-token";

const config = { API_ENDPOINT, TOKEN_KEY };

export default config;