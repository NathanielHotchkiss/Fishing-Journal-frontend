import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import config from "../config";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../layout/Layout";
import TokenService from "../services/token-service";
import { UserContext } from "../App";

export default function NewSpecies({ edit }) {
  const navigate = useNavigate();
  const { species_id } = useParams() || null;

  const { userInfo } = useContext(UserContext);
  const { user_id } = userInfo;

  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState([]);
  const [title, setTitle] = useState("Add a new species");
  const [formData, setFormData] = useState({
    user_id: user_id,
    title: "",
    description: "",
    type: "",
  });

  useEffect(() => {
    if (edit) {
      if (!species_id) return null;
      setTitle("Edit species");

      return fetch(`${config.API_ENDPOINT}/species/${species_id}`, {
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
        species_id: species_id,
        user_id: user_id,
        title: res.title,
        description: res.description,
        type: res.type,
      });
    }
  }, [species_id, user_id, edit]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (edit) {
      AuthApiService.updateItem(formData, species_id, "species")
        .then(navigate("/species"))
        .catch(setApiError);
    } else {
      AuthApiService.postItem(formData, "species")
        .then(navigate("/species"))
        .catch(setApiError);
    }
  }

  async function handleDelete() {
    if (window.confirm("Delete species? This cannot be undone.")) {
      AuthApiService.deleteItem(species_id, "species");
      navigate("/species");
    }
  }

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

  const deleteButton = () => {
    if (edit) {
      return (
        <div className="grid sm:grid-cols-2 gap-2 items-start pt-3 sm:pt-5">
          <span className="block sm:mt-px sm:pt-2"></span>
          <button
            className="bg-red-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return null;
    }
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
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Type
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="type"
              id="type"
              autoComplete="off"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option>Select a type</option>
              <option value="Freshwater">Freshwater</option>
              <option value="Saltwater">Saltwater</option>
            </select>
          </div>

          {deleteButton()}

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 mr-2"
                type="button"
                onClick={() => navigate("/species")}
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
