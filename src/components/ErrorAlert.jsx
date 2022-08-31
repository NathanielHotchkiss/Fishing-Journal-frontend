import { XCircleIcon } from "@heroicons/react/solid";

export default function ErrorAlert({ error }) {
  return (
    error && (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-400">Error:</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
