export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            Technologies
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas
            tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim
            et fermentum, augue.
          </p>
          <div className="mt-8 sm:flex">
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="https://github.com/NathanielHotchkiss/Fishing-frontend"
                className="flex items-center justify-center rounded-md border border-transparent bg-zinc-600 px-5 py-3 text-base font-medium text-white hover:bg-zinc-700"
              >
                Frontend Repository
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="https://github.com/NathanielHotchkiss/Fishing-server"
                className="flex items-center justify-center rounded-md border border-transparent bg-zinc-600 px-5 py-3 text-base font-medium text-white hover:bg-zinc-700"
              >
                Backend Repository
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="devicon-javascript-plain text-4xl text-zinc-900"></i>
          </div>
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="devicon-react-original text-4xl text-zinc-800"></i>
          </div>
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="devicon-tailwindcss-plain text-4xl text-zinc-900"></i>
          </div>
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="devicon-express-original text-4xl text-zinc-900"></i>
          </div>
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="devicon-postgresql-plain-wordmark text-4xl text-zinc-900"></i>
          </div>
          <div className="col-span-1 flex justify-center bg-zinc-300 py-8 px-8">
            <i className="bi bi-cup-fill text-4xl text-zinc-900"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
