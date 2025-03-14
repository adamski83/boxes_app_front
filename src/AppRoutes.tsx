import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./Urls/urls";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { Invoices } from "./components/Invoices/Invoices";
import { EditBox } from "./components/Invoices/EditBox";
import { Orders } from "./Orders/Orders";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.dashboard} element={<Dashboard />} />
        <Route path={PATHS.qrScanner} element={<Invoices />} />
        <Route path="/edit/:id" element={<EditBox />} />
        <Route path={PATHS.invoices} element={<Orders />} />
      </Route>
      <Route path={PATHS.login} element={<Login />} />
      <Route path={PATHS.register} element={<Register />} />
      <Route path="*" element={<Navigate to={PATHS.login} />} />
    </Routes>
  );
};
