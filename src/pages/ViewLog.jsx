import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthApiService from "../services/auth-api-service";
import Layout from "../layout/Layout";
import ErrorAlert from "../components/ErrorAlert";

export default function ViewLog() {
  const navigate = useNavigate();
  let { fish_id } = useParams() || null;

  const [apiError, setApiError] = useState(null);
  const [log, setLog] = useState({
    species: "",
    fish_length: "",
    pounds: "",
    ounces: "",
    bait: "",
    fishing_method: "",
    clarity: "",
    description: "",
    filename: "",
    date: "",
    time: "",
    created: "",
  });
  const [title, setTitle] = useState("Create new log");

  let formattedDate = (date) => {
    if (date === null) {
      return null;
    } else {
      return new Date(log.date).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  let formattedTime = (time) => {
    if (time === null) {
      return null;
    } else {
      return time.substring(0, 5);
    }
  };

  useEffect(() => {
    if (!fish_id) return null;
    setTitle("View log");
    AuthApiService.getItem("fishing_logs", fish_id)
      .then((res) => setLog(res))
      .catch(setApiError);
  }, []); // eslint-disable-line

  async function handleDelete(fish_id) {
    if (
      window.confirm(
        "Are you sure you want to delete this log? This cannot be undone."
      )
    ) {
      return await AuthApiService.deleteItem(fish_id, "fishing_logs").then(
        navigate("/dashboard")
      );
    }
  }

  function fishImage(filename) {
    const image = `https://fishing-journal.s3.amazonaws.com/${filename}`;
    if (filename === null) {
      return (
        <div className="relative w-full xl:w-144 shadow-md mx-auto bg-zinc-300"></div>
      );
    } else {
      return (
        <div className="relative w-full xl:w-144 mx-auto">
          <img src={image} alt="" className="relative w-144 mx-auto"></img>
        </div>
      );
    }
  }
  return (
    <Layout title={title}>
      <div className="block lg:flex mx-auto bg-white">
        <ErrorAlert error={apiError} />
        <div className="mt-16 mx-8">{fishImage(log.filename)}</div>

        <div className="space-y-5 sm:space-y-3 mx-auto mt-16 mb-24 text-base font-medium text-zinc-800 w-4/5 lg:w-2/5">
          <div className="grid grid-cols-2 gap-1">
            <div>Species: </div>
            <div>{log.species}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Length: </div>
            <div>
              {log.fish_length}
              <span className="text-xs">in</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Weight:</div>
            <div>
              {log.pounds}
              <span className="text-xs">lbs</span>
              <span className="ml-2">
                {log.ounces}
                <span className="text-xs">oz</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Bait:</div> <div>{log.bait}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Method:</div>
            <div>{log.fishing_method}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Water clarity: </div>
            <div>{log.clarity}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Date caught:</div>
            <div>{formattedDate(log.date)}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Time caught: </div>
            <div>{formattedTime(log.time)}</div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>Description: </div>
            <div>{log.description}</div>
          </div>

          <div className="grid grid-cols-2 gap-1 pb-12">
            <div>Date created:</div>
            <div>{formattedDate(log.created)}</div>
          </div>

          <div className="border-t border-gray-200 pb-8"></div>

          <div className="grid grid-cols-2 gap-1">
            <Link
              to={`/fishing_logs/${fish_id}/edit`}
              className="bg-white rounded-md border border-gray-300 text-center px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none mx-2"
              type="button"
            >
              Edit
            </Link>
            <button
              className="bg-red-100 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none mx-2"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
