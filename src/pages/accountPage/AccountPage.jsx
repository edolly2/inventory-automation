// src/pages/AccountPage.jsx
import { useAuth } from "../../contexts/useAuthHook";
import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";

const AccountPage = () => {
  const { user } = useAuth();
  const location = useLocation();

  // const [profileInfo, setProfileInfo] = useState({
  //   fullName: "John Doe",
  //   street: "123 Oak St",
  //   street2: "",
  //   city: "Omaha",
  //   state: "NE",
  //   zip: "68134",
  //   country: "United States",
  // });

  // function handleSave(updatedProfileInfo) {
  //   setAddress(updatedProfileInfo);
  // }

  const getSubtitle = () => {
    // NORMALIZE PATH
    const path = location.pathname.replace(/^\/account\/?/, "");

    switch (path) {
      case "":
      case "profile":
        return "Manage your profile information";
      case "security":
        return "Security and login";
      case "preferences":
        return "App preferences";
      case "notifications":
        return "Manage notifications and alerts";
      case "billing":
        return "Billing and payment information";
      case "team":
        return "Team management";
      case "api":
        return "API keys and developer settings";
      case "audit":
        return "Access logs and audit history";
      default:
        return "";
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{user?.clientId}</h1>
        <h2>Account Management</h2>
      </div>
      <div className="account-section-container">
        <aside className="account-section account-section-sm">
          <ul>
            <li>
              <NavLink to="profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="security">Security</NavLink>
            </li>
            <li>
              <NavLink to="preferences">Preferences</NavLink>
            </li>
            <li>
              <NavLink to="notifications">Notifications</NavLink>
            </li>
            <li>
              <NavLink to="billing">Billing</NavLink>
            </li>
            <li>
              <NavLink to="team">Team</NavLink>
            </li>
            <li>
              <NavLink to="api">API</NavLink>
            </li>
            <li>
              <NavLink to="audit">Audit Log</NavLink>
            </li>
            <NavLink to="/login">Logout</NavLink>
          </ul>
        </aside>
        <section className="account-section">
          <h3>{getSubtitle()}</h3>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
