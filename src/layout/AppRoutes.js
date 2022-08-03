import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { listLogs } from "../utils/api";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import NewLog from "../components/NewLog";

export default function AppRoutes() {
  const [logsData, setLogsData] = useState([]);
  const [apiError, setApiError] = useState(null);

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setApiError(null);

    listLogs(abortController.signal).then(setLogsData).catch(setApiError);
    return () => abortController.abort();
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              logsData={logsData}
              apiError={apiError}
              loadDashboard={loadDashboard}
            />
          }
        />
        <Route path="/logs/new" element={<NewLog />} />
        <Route
          path="/logs/:log_id/edit"
          element={<NewLog edit={true} loadDashboard={loadDashboard} />}
        />
      </Routes>
    </Router>
  );
}
