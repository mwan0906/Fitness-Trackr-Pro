import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import RoutinesPage from "./routines/RoutinesPage.jsx";
import Error404 from "./Error404.jsx";
import Activity from "./activities/Activity.jsx";
import Routine from "./routines/Routine.jsx";

import { Routes, Route } from "react-router";
import Layout from "./layout/Layout.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="activities/:id" element={<Activity />} />
        <Route path="routines/:id" element={<Routine />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
  /*   if (page === "register") return <Register />;
  if (page === "login") return <Login />;
  if (page === "activities") return <ActivitiesPage />;

  return <Error404 />; */
}
