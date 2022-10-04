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
import Register from "../components/Register";
import SignIn from "../components/SignIn";
import Species from "../pages/Species";
import Stats from "../pages/Stats";
import Tackle from "../pages/Tackle";
import UserSettings from "../pages/UserSettings";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<InnerContent />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewLog />} />
            <Route
              path="/fishing_logs/:fish_id/edit"
              element={<NewLog edit={true} />}
            />
            <Route path="/species" element={<Species />} />
            <Route path="/species/new" element={<NewSpecies />} />
            <Route
              path="/species/:species_id/edit"
              element={<NewSpecies edit={true} />}
            />
            <Route path="/tackle" element={<Tackle />} />
            <Route path="/tackle/new" element={<NewTackle />} />
            <Route
              path="/tackle/:tackle_id/edit"
              element={<NewTackle edit={true} />}
            />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/stats" element={<Stats />} />
          </Route>
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
