import React from "react";
import Layout from "../layout/Layout";

export default function UserSettings() {
  return (
    <Layout>
      <div className="flex-1 xl:overflow-y-auto m-2">
        <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-gray-900">
            Account
          </h1>

          <form className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-blue-gray-900">
                  Profile
                </h2>
       
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              

              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <img
                    className="inline-block h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="ml-4 flex">
                    <div className="relative flex cursor-pointer items-center rounded-md border border-blue-gray-300 bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
                      <label
                        htmlFor="user-photo"
                        className="pointer-events-none relative text-sm font-medium text-blue-gray-900"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      />
                    </div>
                    <button
                      type="button"
                      className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-gray-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-blue-gray-900">
                  Personal Information
                </h2>

              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Email address
                </label>
                <input
                  type="text"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                  <option />
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-blue-gray-900"
                >
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>

              <p className="text-sm text-blue-gray-500 sm:col-span-6">
                This account was created on{" "}
                <time dateTime="2017-01-05T20:35:40">
                  January 5, 2017, 8:35:40 PM
                </time>
                .
              </p>
            </div>

            <div className="flex justify-end pt-8">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-blue-gray-900 shadow-sm hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-zinc-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
