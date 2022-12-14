import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import TokenService from "../services/token-service";

import ErrorAlert from "../components/ErrorAlert";
import Layout from "../layout/Layout";
import { UserContext } from "../App";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function Tackle() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState(null);

  const { isLoading, tackleData, setTackleData } = useContext(UserContext);

  const user_id = TokenService.getUserId();

  useEffect(() => {
    AuthApiService.listItems("tackle", user_id)
      .then((res) => setTackleData(res))
      .catch(setApiError);
  }, []); // eslint-disable-line

  if (isLoading === true) {
    return (
      <Layout title="Tackle">
        <div className="flex justify-center items-center h-full">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  } else if (tackleData.length === 0) {
    return (
      <Layout title="Tackle">
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
            Get started by adding tackle.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/tackle/new")}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-zinc-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New tackle
            </button>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout title="Tackle">
        <ErrorAlert error={apiError} />
        <div className="md:px-6 lg:px-8 sm:mx-12 lg:mx-16">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto mt-6">
              <p className="mt-2 text-sm text-gray-700">
                A list of all the tackle listed on your account including their
                title, description, and type.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => navigate("/tackle/new")}
                className="sm:ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              >
                Add tackle
              </button>
            </div>
          </div>
          <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Color
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {tackleData.map((tackle) => (
                  <tr key={tackle.tackle_id}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {tackle.title}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only sm:hidden">Description</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">
                          {tackle.description}
                        </dd>
                      </dl>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {tackle.brand}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {tackle.color}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {tackle.description}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <Link to={`${tackle.tackle_id}`} className="">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }
}
