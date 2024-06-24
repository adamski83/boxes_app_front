import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { HOME, DASHBOARD, INVOICES, LOGIN } from "./urls/urls";
import { Login } from "./components/login/Login";
import { useState } from "react";

function App() {
  //todo // state jest tylko po to aby przetestować ekran login
  const [state, setState] = useState(false);
  return (
    <div className="app">
      {state ? (
        <>
          <SidebarMenu />
          <section className="section">
            <Routes>
              <Route path={HOME} element={<Home />} />
              <Route path={DASHBOARD} element={<Dashboard />} />
              <Route path={INVOICES} element={<Invoices />} />
              <Route path={LOGIN} element={<Login />} />
            </Routes>
          </section>
        </>
      ) : (
        <Login state={state} />
      )}
    </div>
  );
}

export default App;
