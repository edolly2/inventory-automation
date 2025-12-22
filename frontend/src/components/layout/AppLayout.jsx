// src/components/layout/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Bottombar from "./Bottombar.jsx";

const AppLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        {/* Topbar now supports tenant switching */}
        <Topbar />

        <main className="app-content">
          <Outlet />
        </main>
        <Bottombar />
      </div>
    </div>
  );
};

export default AppLayout;
