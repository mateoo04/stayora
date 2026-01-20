import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import AppLayout from "../layouts/AppLayout";
import NotFound from "../pages/NotFound";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { AdminBoard } from "../pages/admin/AdminBoard";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound/>} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminBoard />}/>
        </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}