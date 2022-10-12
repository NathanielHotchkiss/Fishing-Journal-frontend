import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import InnerContent from "../components/InnerContent";
import NewLog from "../pages/NewLog";
import NewTackle from "../pages/NewTackle";
import NewSpecies from "../pages/NewSpecies";
import NotFound from "../components/NotFound";
import Protected from "../components/Protected";
import Species from "../pages/Species";
import Tackle from "../pages/Tackle";
import UserSettings from "../pages/UserSettings";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<InnerContent />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new" element={<NewLog />} />
            <Route
              path="fishing_logs/:fish_id/edit"
              element={<NewLog edit={true} />}
            />
            <Route path="species">
              <Route index element={<Species />} />
              <Route path="new" element={<NewSpecies />} />
              <Route path=":species_id" element={<NewSpecies edit={true} />} />
            </Route>
            <Route path="tackle">
              <Route index element={<Tackle />} />
              <Route path="new" element={<NewTackle />} />
              <Route path=":tackle_id" element={<NewTackle edit={true} />} />
            </Route>
            <Route path="settings" element={<UserSettings />} />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
