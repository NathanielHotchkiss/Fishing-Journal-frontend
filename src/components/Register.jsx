import React, { useState } from "react";
import AuthApiService from "../services/auth-api-service";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import TokenService from "../services/token-service";

export default function Register() {
  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState(null);

  const handleRegisterUser = (event) => {
    event.preventDefault();

    const { first_name, last_name, email, password } = event.target;

    let newUser = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    };

    AuthApiService.postUser(newUser)
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
              navigate("/dashboard");
            }
          })
          .catch((res) => {
            setErrorMessages(res.error);
          });
      })
      .catch((res) => {
        setErrorMessages(res.error);
      });
  };

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
