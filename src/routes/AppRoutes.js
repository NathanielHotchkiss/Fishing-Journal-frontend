import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NewLog from "../pages/NewLog";
import NewTackle from "../pages/NewTackle";
import NotFound from "../components/NotFound";
import Protected from "../components/Protected";
import Register from "../components/Register";
import Species from "../pages/Species";
import NewSpecies from "../pages/NewSpecies";
import SignIn from "../components/SignIn";
import Stats from "../pages/Stats";
import Tackle from "../pages/Tackle";
import UserSettings from "../pages/UserSettings";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/new"
          element={
            <Protected>
              <NewLog />
            </Protected>
          }
        />
        <Route
          path="/fishing_logs/:fish_id/edit"
          element={
            <Protected>
              <NewLog edit={true} />
            </Protected>
          }
        />
        <Route
          path="/species"
          element={
            <Protected>
              <Species />
            </Protected>
          }
        />
        <Route
          path="/species/new"
          element={
            <Protected>
              <NewSpecies />
            </Protected>
          }
        />
        <Route
          path="/species/:species_id/edit"
          element={
            <Protected>
              <NewSpecies edit={true} />
            </Protected>
          }
        />
        <Route
          path="/tackle"
          element={
            <Protected>
              <Tackle />
            </Protected>
          }
        />
        <Route
          path="/tackle/new"
          element={
            <Protected>
              <NewTackle />
            </Protected>
          }
        />
        <Route
          path="/tackle/:tackle_id/edit"
          element={
            <Protected>
              <NewTackle edit={true} />
            </Protected>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/settings"
          element={
            <Protected>
              <UserSettings />
            </Protected>
          }
        />
        <Route
          path="/stats"
          element={
            <Protected>
              <Stats />
            </Protected>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
