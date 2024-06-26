import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { PATHS } from "./urls/urls";
import { Login } from "./components/login/Login";
import { useState } from "react";

function App() {
  //todo // state jest tylko po to aby przetestować ekran login
  const [state, setState] = useState(false);
  const { home, dashboard, invoices, login } = PATHS;
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
