import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import Layout from "../layout/Layout";
import { UserContext } from "../App";
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
          <div className="grid sm:grid-cols-2 gap-2 items-start pt-3 sm:pt-5">
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
              onClick={() => handleDelete()}
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
              Save changes
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
