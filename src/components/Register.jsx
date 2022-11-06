import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";
import { UserContext } from "../App";

export default function Register() {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { isLoading, setIsLoading } = context;

  const [errorMessages, setErrorMessages] = useState(null);

  // posting a new user then signing the user in
  const handleRegisterUser = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { first_name, last_name, email, password } = event.target;

    let newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    };

    AuthApiService.postItem(newUser, "app_users")
      .then(async () => {
        await AuthApiService.postLogin({
          email: newUser.email,
          password: newUser.password,
        })
          .then((res) => {
            if (!res) throw new Error(res);
            else {
              TokenService.saveAuthToken(res.authToken);
              TokenService.saveUserId(res.user_id);
              AuthApiService.getItem("app_users", res.user_id)
                .then(
                  (res) => TokenService.saveEmail(res.email),
                  TokenService.saveFirstName(res.first_name),
                  TokenService.saveLastName(res.last_name)
                )
                .then(setIsLoading(false))
                .then(navigate("/dashboard"));
            }
          })

          .catch((res) => {
            setIsLoading(false);
            setErrorMessages(res.error);
          });
      })
      
      .catch((res) => {
        setIsLoading(false);
        setErrorMessages(res.error);
      });
  };

  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center h-56">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <form className="space-y-6" onSubmit={handleRegisterUser}>
        <ErrorAlert error={errorMessages} />
        <div className="mt-6">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-zinc-700"
          >
            First Name:
          </label>
          <div className="mt-1">
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-zinc-700"
          >
            Last Name:
          </label>
          <div className="mt-1">
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700"
          >
            Email:
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700"
          >
            Password:
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          >
            Register
          </button>
        </div>
      </form>
    );
  }
}
