export default function LogoCloud() {
  return (
    <div className="bg-zinc-800">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
              Technologies
            </h2>

            <div className="mt-8 flex">
              <a href="https://github.com/NathanielHotchkiss/Fishing-frontend">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                >
                  Frontend source code
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
                  Backend source code
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
  );
}
