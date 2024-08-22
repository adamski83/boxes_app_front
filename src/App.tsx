import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { PATHS } from "./urls/urls";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";

function App() {
  const { home, dashboard, invoices, login, register } = PATHS;
  return (
    <div className="app">
      <>
        <SidebarMenu />
        <>
          <Routes>
            <Route path={home} element={<Home />} />
            <Route path={dashboard} element={<Dashboard />} />
            <Route path={invoices} element={<Invoices />} />
            <Route path={login} element={<Login />} />
            <Route path={register} element={<Register />} />
          </Routes>
        </>
      </>
    </div>
  );
}

export default App;
