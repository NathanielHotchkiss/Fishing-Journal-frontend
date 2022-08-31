/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-api-service";
import Context from "../contexts/UserContext";

class LoginForm extends React.Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = Context;

  state = { error: null };

  handleSubmitJWTAuth = (event) => {
    event.preventDefault();
    this.setState({ error: null });
    const { email, password } = event.target;

    console.log(email);

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        TokenService.saveUserName(res.email);
        TokenService.saveUserId(res.id);
        const { onLoginSuccess } = this.props;
        onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="min-h-full flex">
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="h-screen w-full bg-gradient-to-tl from-blue-400 to-blue-50"></div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg place-self-center">
          <div className="bg-white py-8 px-4 sm:px-10">
            <form className="space-y-6" action="#" method="POST">
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
                    type="email"
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
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">Forgot your password?</div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={(event) => this.handleSubmitJWTAuth(event)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
