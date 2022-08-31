import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const database = [
    {
      email: "user1@email.com",
      password: "pass1",
    },
    {
      email: "user2@email.com",
      password: "pass2",
    },
  ];

  const errors = {
    email: "invalid username",
    password: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.email === email.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
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
                {renderErrorMessage("email")}
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
                {renderErrorMessage("password")}
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
                onClick={(event) => handleSubmit(event)}
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

  return <>{isSubmitted ? navigate("/") : renderForm}</>;
}
