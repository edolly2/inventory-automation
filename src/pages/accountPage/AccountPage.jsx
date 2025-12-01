// src/pages/AccountPage.jsx
import { useAuth } from "../../contexts/useAuthHook";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import SecuritySection from "./components/SecuritySection";
import BillingSection from "./components/BillingSection";
import PreferencesSection from "./components/PreferencesSection";
import NotificationsSection from "./components/NotificationsSection";
import TeamSection from "./components/TeamSection";
import APISection from "./components/APISection";
import AuditLogSection from "./components/AuditLogSection";

const AccountPage = () => {
  const { user } = useAuth();
  const [whichAccountCard, setWhichAccountCard] = useState("profileCard");

  const renderSection = () => {
    switch (whichAccountCard) {
      case "profileCard":
        return <ProfileSection />;
      case "securityCard":
        return <SecuritySection />;
      case "billingCard":
        return <BillingSection />;
      case "preferencesCard":
        return <PreferencesSection />;
      case "notificationsCard":
        return <NotificationsSection />;
      case "teamCard":
        return <TeamSection />;
      case "apiCard":
        return <APISection />;
      case "auditCard":
        return <AuditLogSection />;
      default:
        return <div>Select a setting on the left.</div>;
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{user?.clientId}</h1>
        <h2>Account Management</h2>
      </div>
      <div className="account-section-container">
        <div className="account-section account-section-sm">
          <ul>
            <li onClick={() => setWhichAccountCard("profileCard")}>Profile</li>

            <li onClick={() => setWhichAccountCard("securityCard")}>
              Security
            </li>
            <li onClick={() => setWhichAccountCard("preferencesCard")}>
              Preferences
            </li>
            <li onClick={() => setWhichAccountCard("notificationsCard")}>
              Notifications
            </li>
            <li onClick={() => setWhichAccountCard("billingCard")}>Billing</li>
            <li onClick={() => setWhichAccountCard("teamCard")}>Team</li>
            <li onClick={() => setWhichAccountCard("apiCard")}>API</li>
            <li onClick={() => setWhichAccountCard("auditCard")}>Audit Log</li>
            <NavLink to="/login">Logout</NavLink>
          </ul>
        </div>
        <div className="account-section">{renderSection()}</div>
      </div>
    </div>
  );
};

export default AccountPage;
