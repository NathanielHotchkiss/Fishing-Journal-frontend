import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorAlert from "../layout/ErrorAlert";
import { createLog, editLog, listLogs } from "../utils/api";

export default function NewLog({ edit, loadDashboard }) {
  const navigate = useNavigate();
  const { log_id } = useParams();

  const [apiError, setApiError] = useState(null);
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

    if (edit) {
      editLog(log_id, formData, abortController.signal)
        .then(() => navigate(-1))
        .catch(setApiError);
    } else {
      createLog(formData, abortController.signal)
        .then(() => navigate(-1))
        .catch(setApiError);
    }

    return () => abortController.abort();
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200 my-12 mx-24 w-full sm:w-144 mx-auto">
      <ErrorAlert error={apiError} />
      <div className="space-y-6 sm:space-y-5 mx-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Log a new catch
        </h3>

        <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Species:
          </label>
          <input
            className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
            name="species"
            id="species"
            type="text"
            onChange={handleChange}
            value={formData.species}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Length (inches):
          </label>
          <input
            className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
            name="size"
            id="size"
            type="number"
            onChange={handleChange}
            value={formData.size}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Weight:
          </label>
          <div className="">
            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5 sm:w-20 px-1"
              placeholder="lbs"
              name="pounds"
              id="pounds"
              type="number"
              onChange={handleChange}
              value={formData.pounds}
            />

            <input
              className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500 w-2/5 sm:w-20 ml-6 px-1"
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
          <input
            className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
            name="bait"
            id="bait"
            type="text"
            onChange={handleChange}
            value={formData.bait}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-start border-t border-gray-200 pt-3 sm:pt-5">
          <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            Method used:
          </label>
          <input
            className="border border-slate-200 rounded h-8 focus:ring-blue-500 focus:border-blue-500"
            name="equipment"
            id="equipment"
            type="text"
            onChange={handleChange}
            value={formData.equipment}
            required
          />
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
  );
}
