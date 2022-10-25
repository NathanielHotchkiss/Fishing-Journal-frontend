import { useState } from "react";
import FeaturesGrid from "../components/FeaturesGrid";
import Footer from "../components/Footer";
import Register from "../components/Register";
import SignIn from "../components/SignIn";

export default function Home() {
  const [formToggle, setFormToggle] = useState(true);

  const handleFormToggle = () => {
    setFormToggle((current) => !current);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-zinc-800">
        <div
          className="hidden sm:absolute sm:inset-0 sm:block"
          aria-hidden="true"
        >
          {/* Background pattern */}
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
        <main className="relative pt-24 pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:text-left">
                <div>
                  <h1 className="sm:mt-10 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Capture the one that got away.
                  </h1>
                  <p className="mt-5 text-base text-zinc-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Or at least capture valuable fishing data on the ones you
                    actually caught. Log new catches and show off your best,
                    right from your phone.
                  </p>
                  <p className="mt-3 text-base text-zinc-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Record things like the length and weight of the fish, the
                    method used to catch it, and upload images. Build out your
                    virtual tackle box by adding your lures, baits, hooks, or
                    whatever you use to catch fish. Input species into your
                    Journal that are relevant to your expeditions.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 mt-20 sm:mt-0">
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

      <FeaturesGrid />

      {/* Logo Cloud Section */}
      <div className="bg-zinc-800">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
                Technologies used
              </h2>

              <div className="mt-8 flex">
                <a href="https://github.com/NathanielHotchkiss/Fishing-frontend">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                  >
                    Frontend
                    <i
                      className="bi bi-github ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </a>

                <a href="https://github.com/NathanielHotchkiss/Fishing-server">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-zinc-600 ml-3 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                  >
                    Backend
                    <i
                      className="bi bi-github ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </a>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="devicon-javascript-plain text-3xl sm:text-4xl text-zinc-900"></i>
              </div>
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="devicon-react-original text-3xl sm:text-4xl text-zinc-800"></i>
              </div>
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="devicon-tailwindcss-plain text-3xl sm:text-4xl text-zinc-900"></i>
              </div>
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="devicon-express-original text-3xl sm:text-4xl text-zinc-900"></i>
              </div>
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="devicon-postgresql-plain-wordmark text-3xl sm:text-4xl text-zinc-900"></i>
              </div>
              <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
                <i className="bi bi-cup-hot-fill text-3xl sm:text-4xl text-zinc-900"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
