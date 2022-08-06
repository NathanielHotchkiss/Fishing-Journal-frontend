import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

import { listLogs, deleteLog } from "../utils/api";

import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline";

export default function Card(loadDashboard) {
  const [fetchedData, setFetchedData] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(fetchData, []);

  function fetchData() {
    const abortController = new AbortController();
    setApiError(null);

    listLogs(abortController.signal).then(setFetchedData).catch(setApiError);

    return () => abortController.abort();
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function handleDelete(log_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();

      deleteLog(log_id, abortController.status)
        .then(loadDashboard)
        .catch(setApiError);

      return () => abortController.abort();
    }
  }

  return (
    <>
      {fetchedData.map((info, id) => {
        const { log_id, species, size, pounds, ounces, bait, equipment } = info;

        return (
          <div key={id} className="block">
            <div className="relative h-72 w-96 bg-slate-100 shadow-md mx-auto "></div>

            <div className="relative p-2 h-40 w-72 shadow-md -top-12 mx-auto bg-white rounded-lg">
              <div className="flex justify-between">
                <p className="mt-2 block text-lg capitalize font-medium text-gray-900 truncate pointer-events-none">
                  {species}
                </p>

                <div>
                  <Menu
                    as="div"
                    className="relative inline-block text-left mt-2"
                  >
                    <div>
                      <Menu.Button className="bg-gray-100 rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/logs/${log_id}/edit`}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "group flex items-center px-4 py-2 text-sm"
                                )}
                              >
                                <PencilAltIcon
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Edit
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                onClick={() => handleDelete(log_id)}
                                className={classNames(
                                  active
                                    ? "w-full bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "group flex items-center px-4 py-2 text-sm"
                                )}
                              >
                                <TrashIcon
                                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                Delete
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <p className="block text-base font-medium text-gray-500 pointer-events-none">
                <span>Length: </span>
                {size}
                <span className="text-xs">in</span>
              </p>
              <p className="block text-base font-medium text-gray-500 pointer-events-none">
                <span>Weight: </span>
                <span>
                  {pounds}
                  <span className="text-xs">lbs</span>
                </span>
                <span className="ml-2">
                  {ounces}
                  <span className="text-xs">oz</span>
                </span>
              </p>
              <p className="block text-base font-medium text-gray-500 pointer-events-none">
                <span>Bait used: </span>
                {bait}
              </p>
              <p className="block text-base font-medium text-gray-500 pointer-events-none">
                Method used: {equipment}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
