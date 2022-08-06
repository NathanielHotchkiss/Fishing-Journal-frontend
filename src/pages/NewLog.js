import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorAlert from "../components/ErrorAlert";
import { createLog, editLog, listLogs } from "../utils/api";

export default function NewLog({ edit, loadDashboard }) {
  const navigate = useNavigate();
  const { log_id } = useParams();

  const [apiError, setApiError] = useState(null);
  const [formError, setFormError] = useState([]);
  const [formData, setFormData] = useState({
    species: "",
    size: "",
    pounds: "",
    ounces: "",
    bait: "",
    equipment: "",
  });

  useEffect(() => {
    if (edit) {
      if (!log_id) return null;

      loadLogs()
        .then((response) =>
          response.find((log) => log.log_id === Number(log_id))
        )
        .then(fillFields);
    }

    function fillFields(foundLog) {
      if (!foundLog) {
        return null;
      }

      setFormData({
        species: foundLog.species,
        size: foundLog.size,
        pounds: foundLog.pounds,
        ounces: foundLog.ounces,
        bait: foundLog.bait,
        equipment: foundLog.equipment,
      });
    }

    async function loadLogs() {
      const abortController = new AbortController();
      return await listLogs(null, abortController.signal).catch(setApiError);
    }
  }, [edit, log_id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    const foundErrors = [];

    if (validateFields(foundErrors)) {
      if (edit) {
        editLog(log_id, formData, abortController.signal)
          .then(loadDashboard)
          .then(() => navigate(-1))
          .catch(setApiError);
      } else {
        createLog(formData, abortController.signal)
          .then(loadDashboard)
          .then(() => navigate(-1))
          .catch(setApiError);
      }
    }
    setFormError(foundErrors);

    return () => abortController.abort();
  }

  function validateFields(foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank.`,
        });
      }
    }

    return foundErrors.length === 0;
  }

  const errorsJSX = () => {
    return formError.map((error, idx) => (
      <ErrorAlert key={idx} error={error} />
    ));
  };

  return (
    <>
      <div className="my-12 mx-24 w-full sm:w-144 mx-auto">
        {errorsJSX()}
        <ErrorAlert error={apiError} />
      </div>
      <form className="space-y-8 divide-y divide-gray-200 my-12 mx-24 w-full sm:w-144 mx-auto">
        <div className="space-y-6 sm:space-y-5 mx-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Log a new catch
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Species:
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="species"
              id="species"
              autoComplete="off"
              value={formData.species}
              onChange={handleChange}
              required
            >
              <option>Select a species</option>
              <option value="Largemouth Bass">Largemouth Bass</option>
              <option value="Smallmouth Bass">Smallmouth Bass</option>
              <option value="Carp">Carp</option>
              <option value="Blue Catfish">Blue Catfish</option>
              <option value="Channel Catfish">Channel Catfish</option>
              <option value="Flathead Catfish">Flathead Catfish</option>
              <option value="Longnose Gar">Longnose Gar</option>
              <option value="Black Crappie">Black Crappie</option>
              <option value="Bluegill">Bluegill</option>
              <option value="Pumpkinseed Panfish">Pumpkinseed Panfish</option>
              <option value="Yellow Perch">Yellow Perch</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Length:
            </label>
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
              placeholder="in"
              name="size"
              id="size"
              type="number"
              onChange={handleChange}
              value={formData.size}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Weight:
            </label>
            <div className="flex justify-between">
              <input
                className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5"
                placeholder="lbs"
                name="pounds"
                id="pounds"
                type="number"
                onChange={handleChange}
                value={formData.pounds}
              />

              <input
                className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5"
                placeholder="oz"
                name="ounces"
                id="ounces"
                type="number"
                onChange={handleChange}
                value={formData.ounces}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Bait used:
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="bait"
              id="bait"
              autoComplete="off"
              value={formData.bait}
              onChange={handleChange}
            >
              <option>Select a bait</option>
              <option value="Crank Bait">Crank Bait</option>
              <option value="Flies">Flies</option>
              <option value="Jigs">Jigs</option>
              <option value="Plugs">Plugs</option>
              <option value="Poppers">Poppers</option>
              <option value="Spinners">Spinners</option>
              <option value="Spoons">Spoons</option>
              <option value="Real">Real</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Fishing Method:
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              name="equipment"
              id="equipment"
              autoComplete="off"
              value={formData.equipment}
              onChange={handleChange}
            >
              <option>Select a method</option>
              <option value="Boat">Boat</option>
              <option value="Casting">Casting</option>
              <option value="Fly">Fly</option>
              <option value="Shore">Shore</option>
              <option value="Trolling">Trolling</option>
            </select>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
