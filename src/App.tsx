import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { PATHS } from "./urls/urls";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    assignTokenIntoAPI();
  }, []);

  return (
    <div className="app">
      <>
        <SidebarMenu />
        <Toaster />
        <>
          <Routes>
            <Route path={PATHS.home} element={<Home />} />
            <Route path={PATHS.dashboard} element={<Dashboard />} />
            <Route path={PATHS.invoices} element={<Invoices />} />
            <Route path={PATHS.login} element={<Login />} />
            <Route path={PATHS.register} element={<Register />} />
          </Routes>
        </>
      </>
    </div>
  );
}

export default App;

//    adamkope82
//    AfM2d8WA6bndH6BO
//mongodb+srv://adamkope82:cOlBG0VO1tLONZJZ@cluster0.cxjn6.mongodb.net/
