// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { TenantProvider } from "./contexts/TenantContext.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";

// Account
// import AccountPageLayout from "./pages/accountPage/AccountPageLayout.jsx";
import AccountPage from "./pages/accountPage/AccountPage.jsx";
import ProfileSection from "./pages/accountPage/ProfileSection.jsx";
import APISection from "./pages/accountPage/APISection.jsx";
import AuditLogSection from "./pages/accountPage/AuditLogSection.jsx";
import BillingSection from "./pages/accountPage/BillingSection.jsx";
import NotificationsSection from "./pages/accountPage/NotificationsSection.jsx";
import PreferencesSection from "./pages/accountPage/PreferencesSection.jsx";
import SecuritySection from "./pages/accountPage/SecuritySection.jsx";
import TeamSection from "./pages/accountPage/TeamSection.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected section */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="sales" element={<SalesPage />} />

          {/* Account Nested Layout */}
          {/* <Route path="account" element={<AccountPageLayout />}> */}
          {/* Sidebar wrapper */}

          <Route path="account" element={<AccountPage replace />}>
            {/* <Route index element={<Navigate to="profile" replace />} /> */}
            <Route path="profile" element={<ProfileSection />} />
            <Route path="security" element={<SecuritySection />} />
            <Route path="preferences" element={<PreferencesSection />} />
            <Route path="notifications" element={<NotificationsSection />} />
            <Route path="billing" element={<BillingSection />} />
            <Route path="team" element={<TeamSection />} />
            <Route path="api" element={<APISection />} />
            <Route path="audit" element={<AuditLogSection />} />
          </Route>
        </Route>
      </Route>
      {/* </Route> */}

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <TenantProvider>
      <AppRoutes />
    </TenantProvider>
  );
}
