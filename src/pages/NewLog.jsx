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
  let { fish_id } = useParams() || null;

  const { speciesData, tackleData, userInfo } = useContext(UserContext);
  const { user_id } = userInfo;

  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState([]);
  const [title, setTitle] = useState("Create new log");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    user_id: user_id,
    species: "",
    fish_length: "",
    pounds: "",
    ounces: "",
    bait: "",
    fishing_method: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const foundErrors = [];

    if (validateFields(foundErrors)) {
      if (edit) {
        AuthApiService.updateItem(formData, fish_id, "fishing_logs")
          .then(navigate("/dashboard"))
          .catch(setApiError);
      } else {
        AuthApiService.postItem(formData, "fishing_logs")
          .then((res) => AuthApiService.postImage(file, res.fish_id))
          .then(navigate("/dashboard"))
          .catch(setApiError);
      }
    }
    setFormError(foundErrors);
  }

  function validateFields(foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push(`${field.split("_").join(" ")} cannot be left blank.`);
      }
    }

    if (parseInt(formData.ounces) >= 15.9) {
      foundErrors.push("Ounces must be a number less than 16.");
    }

    return foundErrors.length === 0;
  }

  useEffect(() => {
    if (edit) {
      if (!fish_id) return null;
      setTitle("Edit log");

      return fetch(`${config.API_ENDPOINT}/fishing_logs/${fish_id}`, {
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
        fish_id: fish_id,
        user_id: user_id,
        species: res.species,
        fish_length: res.fish_length,
        pounds: res.pounds,
        ounces: res.ounces,
        bait: res.bait,
        fishing_method: res.fishing_method,
      });
    }
  }, [fish_id, user_id, edit]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }
  const fileSelected = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFile(file);
  };

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
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700">
              Cover photo
            </label>

            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    onChange={fileSelected}
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-5 mx-8">
          <div className="grid sm:grid-cols-2 gap-2 items-start border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Species
            </label>

            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="species"
              id="species"
              autoComplete="off"
              onChange={handleChange}
              value={formData.species}
              required
            >
              <option>Select species</option>
              {speciesData.map((species) => (
                <option key={species.species_id} value={species.title}>
                  {species.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Length
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              placeholder="in"
              name="fish_length"
              id="fish_length"
              type="text"
              onChange={handleChange}
              value={formData.fish_length}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Weight
            </label>
            <div className="flex justify-between">
              <input
                className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5"
                placeholder="lbs"
                name="pounds"
                id="pounds"
                type="text"
                onChange={handleChange}
                value={formData.pounds}
              />

              <input
                className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5"
                placeholder="oz"
                name="ounces"
                id="ounces"
                type="text"
                onChange={handleChange}
                value={formData.ounces}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Tackle used
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="bait"
              id="bait"
              autoComplete="off"
              value={formData.bait}
              onChange={handleChange}
            >
              <option>Select tackle</option>
              {tackleData.map((tackle) => (
                <option key={tackle.tackle_id} value={tackle.title}>
                  {tackle.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-2 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Fishing Method
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="fishing_method"
              id="fishing_method"
              autoComplete="off"
              value={formData.fishing_method}
              onChange={handleChange}
            >
              <option>Select a method</option>
              <option value="Bait fishing">Bait fishing</option>
              <option value="Fly fishing">Fly fishing</option>
              <option value="Bait casting">Bait casting</option>
              <option value="Spinning">Bait spinning</option>
              <option value="Trolling">Trolling</option>
            </select>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 mr-2"
                type="button"
                onClick={() => navigate("/dashboard")}
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
