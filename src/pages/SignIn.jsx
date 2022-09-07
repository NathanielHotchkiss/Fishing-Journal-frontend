/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-api-service";
import { UserContext } from "../routes/AppRoutes";

export default function LoginForm() {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [error, setError] = useState(null);

  async function handleSubmitJWTAuth(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    return await AuthApiService.postLogin({
      email: email,
      password: password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        const user_id = TokenService.getUserId();
        TokenService.saveUserId(user_id);
        context.handleApiCalls(user_id);
      })
      .then(navigate("/"))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-full flex">
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="h-screen w-full bg-gradient-to-tl from-blue-400 to-blue-50"></div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg place-self-center">
        <div className="bg-white py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmitJWTAuth}>
            <fieldset>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">Forgot your password?</div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
