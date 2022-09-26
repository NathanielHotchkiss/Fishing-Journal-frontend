import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import Layout from "../layout/Layout";
import Sort from "../components/Sort";
import { UserContext } from "../routes/AppRoutes";
import AuthApiService from "../services/auth-api-service";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const context = useContext(UserContext);
  const userLogs = context.fishingLogsData;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    context.handleApiCalls();
  }, []);

  async function handleDelete(fish_id) {
    return await AuthApiService.deleteLog(fish_id).then(
      window.location.reload()
    );
  }

  if (userLogs.length === 0) {
    return (
      <Layout title="Dashboard">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Nothing to show yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by logging a catch.
          </p>
          <div className="mt-6">
            <button
              href="/new"
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New log
            </button>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Dashboard">
        <Sort />
        <div className="grid grid-col-1 lg:grid-cols-2 my-6">
          {userLogs.map((info, id) => {
            const {
              fish_id,
              species,
              fish_length,
              pounds,
              ounces,
              bait,
              fishing_method,
            } = info;

            return (
              <div key={id} className="block">
                <div className="relative h-72 w-96 shadow-md mx-auto bg-zinc-300"></div>
                <div className="relative px-4 py-2 h-44 w-72 shadow-md -top-12 mx-auto bg-white rounded-lg">
                  <div className="flex justify-between">
                    <p className="mt-2 block text-lg capitalize font-semibold text-zinc-600 truncate">
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
                            <EllipsisVerticalIcon
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
                                    to={`/fishing_logs/${fish_id}/edit`}
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "group flex items-center px-4 py-2 text-sm"
                                    )}
                                  >
                                    <PencilSquareIcon
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
                                    onClick={() => handleDelete(fish_id)}
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
                  <ul className="block text-base font-medium text-zinc-700">
                    <li>
                      <span>id: </span>
                      {fish_id}
                    </li>
                    <li>
                      <span>Length: </span>
                      {fish_length}
                      <span className="text-xs">in</span>
                    </li>
                    <li>
                      <span>Weight: </span>
                      <span>
                        {pounds}
                        <span className="text-xs">lbs</span>
                      </span>
                      <span className="ml-2">
                        {ounces}
                        <span className="text-xs">oz</span>
                      </span>
                    </li>
                    <li>
                      <span>Bait used: </span>
                      {bait}
                    </li>
                    <li>Method used: {fishing_method}</li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
}
