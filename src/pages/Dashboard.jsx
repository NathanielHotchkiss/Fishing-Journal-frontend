import React, { useContext, useEffect } from "react";
import Layout from "../layout/Layout";
import Sort from "../components/Sort";
import { UserContext } from "../App";
import { PlusIcon } from "@heroicons/react/24/outline";
import Card from "../components/Card";

export default function Dashboard() {
  const context = useContext(UserContext);
  const userLogs = context.fishingLogsData;
  const { isLoading } = context;

  useEffect(() => {
    context.handleApiCalls();
  }, []); // eslint-disable-line

  if (isLoading === true) {
    return (
      <Layout title="Dashboard">
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
  } else if ((userLogs.length === 0)) {
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
          <Card />
        </div>
      </Layout>
    );
  }
}
