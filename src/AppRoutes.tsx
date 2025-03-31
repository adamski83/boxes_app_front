import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./Urls/urls";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Chart } from "./components/layouts/Charts/Chart";
import Dashboard from "./components/layouts/Dashboard/Dashboard";
import Home from "./components/layouts/Home/Home";
import { EditBox } from "./components/layouts/Invoices/EditBox";
import { Invoices } from "./components/layouts/Invoices/Invoices";
import { Login } from "./components/layouts/Login/Login";
import { Orders } from "./components/layouts/Orders/Orders";
import { Register } from "./components/layouts/Register/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.dashboard} element={<Dashboard />} />
        <Route path={PATHS.qrScanner} element={<Invoices />} />
        <Route path={PATHS.edit} element={<EditBox />} />
        <Route path={PATHS.invoices} element={<Orders />} />
        <Route path={PATHS.charts} element={<Chart />} />
      </Route>
      <Route path={PATHS.login} element={<Login />} />
      <Route path={PATHS.register} element={<Register />} />
      <Route path="*" element={<Navigate to={PATHS.login} />} />
    </Routes>
  );
};
