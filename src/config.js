let API_ENDPOINT;

if (process.env.NODE_ENV === "development") {
  API_ENDPOINT = "http://localhost:5050";
}

else if (process.env.NODE_ENV === 'production') {
API_ENDPOINT = 'https://fishing-journal-server.herokuapp.com';
}

export default { API_ENDPOINT, TOKEN_KEY: "fishing-client-auth-token" };
