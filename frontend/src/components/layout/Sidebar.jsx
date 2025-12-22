// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/useAuthHook.jsx";
import { formatClientName } from "../../utils/helpers/formatClientName.js";
import { getInitials } from "../../utils/helpers/getInitials.js";
import Logo from "../../assets/logo.png";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="" className="logo" />
        <div>
          {/* <div className="sidebar-title">AutoStock Solutions</div> */}

          {/* <div className="sidebar-subtitle">
              {formatClientName(user.clientId)}
              </div> */}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          <div className="logo-circle">{getInitials(user.clientId)}</div>
        </div>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Sales
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Account
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
