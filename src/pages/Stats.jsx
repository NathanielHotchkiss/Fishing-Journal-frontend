import { useState, useEffect } from "react";
import { listFishingLogs } from "../utils/api";
import Layout from "../layout/Layout";

export default function Stats() {
  const [userLogs, setUserLogs] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(fetchData, []);

  function fetchData() {
    const abortController = new AbortController();
    setApiError(null);

    listFishingLogs(abortController.signal).then(setUserLogs).catch(setApiError);

    return () => abortController.abort();
  }

  function totalUserLogs(userLogs) {
    return userLogs.length;
  }

  const stats = [
    { name: 'Total number of catches', stat: '' },
    { name: 'Largest catch (by weight)', stat: '' },
    { name: 'Favorite Species', stat: '' },
  ]

  return (
    <Layout>
    <>
      <h2 className="text-lg leading-6 font-medium text-gray-900 mt-12">
        Lifetime Stats
      </h2>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </>
    </Layout>
  );
}
