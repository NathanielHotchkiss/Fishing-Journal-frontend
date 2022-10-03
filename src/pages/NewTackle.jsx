import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import config from "../config";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../layout/Layout";
import TokenService from "../services/token-service";
import { UserContext } from "../App";

export default function NewLog({ edit }) {
  const navigate = useNavigate();
  const { tackle_id } = useParams() || null;

  const context = useContext(UserContext);
  const { user_id } = context.userInfo;

  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState([]);
  const [title, setTitle] = useState("Create new tackle");
  const [formData, setFormData] = useState({
    user_id: user_id,
    title: "",
    description: "",
    type: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (edit) {
      AuthApiService.updateTackle(formData)
        .then(navigate("/dashboard"))
        .catch(setApiError);
    } else {
      AuthApiService.postNewTackle(formData)
        .then(navigate("/dashboard"))
        .catch(setApiError);
    }
  }

  useEffect(() => {
    if (edit) {
      if (!tackle_id) return null;
      setTitle("Edit log");

      return fetch(`${config.API_ENDPOINT}/tackle/${tackle_id}`, {
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
    }

    function fillFields(res) {
      if (!res) {
        return null;
      }
      setFormData({
        tackle_id: tackle_id,
        user_id: user_id,
        title: res.title,
        description: res.description,
        type: res.type,
      });
    }
  }, [tackle_id, user_id, edit]);

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
    <Layout title={title}>
      <div className="my-12 mx-24 w-full sm:w-144 mx-auto">
        {errorsJSX()}
        <ErrorAlert error={apiError} />
      </div>
      <form
        className="space-y-8 divide-y divide-gray-200 my-12 mx-24 w-full sm:w-144 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6 sm:space-y-5 mx-8">
          <div className="grid sm:grid-cols-2 gap-2 items-start  pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Title
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="title"
              id="title"
              type="text"
              onChange={handleChange}
              value={formData.title}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Description
            </label>
            <textarea
              className="border border-slate-200 rounded h-24 focus:ring-blue-500 focus:border-blue-500"
              name="description"
              id="description"
              type="text"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Type
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              name="type"
              id="type"
              type="text"
              onChange={handleChange}
              value={formData.type}
              required
            />
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 mr-2"
                type="button"
                onClick={() => navigate("/tackle")}
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
        </div>
      </form>
    </Layout>
  );
}
