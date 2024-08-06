import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { PATHS } from "./urls/urls";
import { Register } from "./components/register/Register";
import { useState } from "react";
import { Login } from "./components/login/Login";

function App() {
  //todo // state jest tylko po to aby przetestować ekran login
  const [state, setState] = useState(true);
  const { home, dashboard, invoices, login, register } = PATHS;
  return (
    <div className="app">
      {state ? (
        <>
          <SidebarMenu />
          <section className="section">
            <Routes>
              <Route path={home} element={<Home />} />
              <Route path={dashboard} element={<Dashboard />} />
              <Route path={invoices} element={<Invoices />} />
              <Route path={login} element={<Login />} />
              <Route path={register} element={<Register />} />
            </Routes>
          </section>
        </>
      ) : (
        <Register state={state} />
      )}
    </div>
  );
}

export default App;
