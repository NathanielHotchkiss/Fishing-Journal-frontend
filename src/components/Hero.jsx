import { useState } from "react";

import SignIn from "../components/SignIn";
import Register from "../components/Register";

export default function Hero() {
  const [formToggle, setFormToggle] = useState(true);

  const handleFormToggle = () => {
    setFormToggle((current) => !current);
  };

  const exampleData = {
    species: "Largemouth Bass",
    user_id: "2",
    fish_length: "11",
    pounds: "5",
    ounces: "4",
    bait: "Crank Bait",
    fishing_method: "Shore",
  };

  return (
    <div className="min-h-screen">
      <div
        className="hidden sm:absolute sm:inset-0 sm:block"
        aria-hidden="true"
      >
        <svg
          className="absolute bottom-0 right-0 mb-48 translate-x-1/2 transform text-zinc-700 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
          width={364}
          height={384}
          viewBox="0 0 364 384"
          fill="none"
        >
          <defs>
            <pattern
              id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} fill="currentColor" />
            </pattern>
          </defs>
          <rect
            width={364}
            height={384}
            fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)"
          />
        </svg>
      </div>
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Capture the one that got away.
                  </h1>
                  <p className="mt-3 text-base text-zinc-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Or at least capture valuable fishing data on the ones you
                    actually caught. Log new catches and show off your best,
                    right on your phone.
                  </p>
                  <p className="mt-3 text-base text-zinc-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Example data object:
                  </p>
                  <pre className="mt-3 text-sm text-zinc-300 sm:mt-5">
                    {JSON.stringify(exampleData, null, 2)}
                  </pre>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                <div className="bg-white mb-16 sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-8 sm:px-10">
                    {formToggle ? (
                      <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-900">
                          Sign in
                        </h2>
                        <p className="mt-2 text-center text-sm text-zinc-600">
                          Or{" "}
                          <button
                            onClick={handleFormToggle}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            register a new account.
                          </button>
                        </p>
                      </div>
                    ) : (
                      <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-zinc-900">
                          Create a new account
                        </h2>
                        <p className="mt-2 text-center text-sm text-zinc-600">
                          Already have an account?{" "}
                          <button
                            onClick={handleFormToggle}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    )}
                    {formToggle ? <SignIn /> : <Register />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
