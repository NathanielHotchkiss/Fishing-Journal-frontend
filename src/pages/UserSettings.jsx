import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import Layout from "../layout/Layout";
import config from "../config";
import ErrorAlert from "../components/ErrorAlert";
import TokenService from "../services/token-service";

export default function UserSettings() {
  const navigate = useNavigate();
  const user_id = TokenService.getUserId();

  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState([]);
  const [formData, setFormData] = useState({
    user_id: user_id,
    email: "",
    first_name: "",
    last_name: "",
    created: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const foundErrors = [];

    if (validateFields(foundErrors)) {
      AuthApiService.updateItem(formData, user_id, "app_users").catch(
        setApiError
      );
    }
    setFormError(foundErrors);
  }

  function validateFields(foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push(`${field.split("_").join(" ")} cannot be left blank.`);
      }
    }
    return foundErrors.length === 0;
  }

  async function handleDelete() {
    if (window.confirm("Delete account? This cannot be undone.")) {
      AuthApiService.deleteItem(user_id, "app_users");
      TokenService.clearEverything();
      navigate("/");
    }
  }

  useEffect(() => {
    if (!user_id) return null;

    return fetch(`${config.API_ENDPOINT}/app_users/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )

      .then(fillFields)

      .catch(setFormError);

    function fillFields(res) {
      if (!res) {
        return null;
      }
      setFormData({
        user_id: res.user_id,
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        created: res.created,
      });
    }
  }, [user_id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const errorsJSX = () => {
    return formError.map((error, idx) => (
      <ErrorAlert key={idx} error={error} />
    ));
  };

  return (
    <Layout title="Account settings">
      <div className="my-12 mx-24 w-full sm:w-144 mx-auto">
        {errorsJSX()}
        <ErrorAlert error={apiError} />
      </div>
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

          <div className="flex justify-end pt-3">
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

          <div className="border-t border-gray-200 my-5 sm:my-8"></div>

          <div className="pt-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Delete your account
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Once you delete your account, you will lose all data associated
                with it.
              </p>
            </div>
            <div className="mt-3">
              <button
                onClick={() => handleDelete()}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
