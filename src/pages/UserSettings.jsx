import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import Layout from "../layout/Layout";
import { UserContext } from "../routes/AppRoutes";
import TokenService from "../services/token-service";

export default function UserSettings() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const user = context.userInfo;

  const user_id = TokenService.getUserId();

  const [formData, setFormData] = useState({
    user_id: user_id,
    email: "",
    first_name: "",
    last_name: "",
    created: "",
  });

  async function handleDelete() {
    if (window.confirm("Delete account? This cannot be undone.")) {
      AuthApiService.deleteUser(user_id);
      TokenService.clearEverything();
      navigate("/");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    AuthApiService.updateUser(formData);
  }

  useEffect(() => {
    setFormData({
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created: user.created,
    });
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <Layout title="Account settings">
      <div className="my-12 mx-24 w-full sm:w-144 mx-auto"></div>
      <form
        className="space-y-8 divide-y divide-gray-200 my-12 mx-24 w-full sm:w-144 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6 sm:space-y-5 mx-8">
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

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              First name
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="first_name"
              id="first_name"
              type="text"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Last name
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="last_name"
              id="last_name"
              type="text"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Email
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="email"
              id="email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <span className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Delete account
            </span>

            <button
              className="bg-red-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              type="button"
              onClick={() =>handleDelete()}
            >
              Delete
            </button>
          </div>

          <div className="flex justify-end pt-5">
            <button
              className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 mr-2"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
