export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="inline text-3xl font-bold tracking-tight text-zinc-900 sm:block sm:text-4xl">
          We want to hear about your experience!
        </h2>
        <p className="inline text-3xl font-bold tracking-tight text-zinc-600 sm:block sm:text-4xl">
          Submit feedback.
        </p>
        <form className="mt-8 sm:flex">
          <label htmlFor="feedback" className="sr-only">
            Feedback
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              name="feedback"
              id="feedback"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={""}
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-zinc-600 px-5 py-3 text-base font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2022 Fishing Logs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
