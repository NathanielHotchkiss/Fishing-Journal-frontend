let API_ENDPOINT;

if (process.env.NODE_ENV === "development") {
  API_ENDPOINT = "http://localhost:5050";
}

// else if (process.env.NODE_ENV === 'production') {
// API_ENDPOINT = 'https://gentle-woodland-76876.herokuapp.com/api';
// }

export default { API_ENDPOINT, TOKEN_KEY: "fishing-client-auth-token" };
