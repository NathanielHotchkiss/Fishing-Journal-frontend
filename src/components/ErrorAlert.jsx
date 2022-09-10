import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function ErrorAlert({ error }) {
  return (
    error && (
      <div className="rounded-md bg-red-50 px-4 py-2 my-2">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-400">Error:</h3>
            <div className="mt-2 text-sm text-gray-900">{error}</div>
          </div>
        </div>
      </div>
    )
  );
}
