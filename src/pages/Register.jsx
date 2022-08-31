import React, { useEffect, useState } from "react";

export default function Register({ edit, loadDashboard }) {
  return (
    <div className="min-h-full flex">
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="h-screen w-full bg-gradient-to-tl from-blue-400 to-blue-50"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-36 xl:px-24">
        <form className="space-y-8 divide-y divide-gray-200 my-12 mx-24 w-full sm:w-144 mx-auto">
          <h3 className="text-xl leading-6 font-medium text-gray-900">
            Create a new account.
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              First Name:
            </label>
            <input
              autoComplete="on"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="first_name"
              id="frist_name"
              type="text"
              //   value={formData.species}
              //   onChange={handleChange}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Last Name:
            </label>
            <input
              autoComplete="on"
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="last_name"
              id="last_name"
              type="text"
              //   onChange={handleChange}
              //   value={formData.size}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Email:
            </label>
            <input
              autoComplete="on"
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="email"
              id="email"
              type="email"
              //   onChange={handleChange}
              //   value={formData.size}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Password:
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="password"
              id="password"
              type="password"
              //   onChange={handleChange}
              //   value={formData.size}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Re-enter Password:
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="password"
              id="password"
              type="password"
              //   onChange={handleChange}
              //   value={formData.size}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
