// src/pages/accountPage/AccountPageLayout.jsx
import { Outlet } from "react-router-dom";

const AccountPageLayout = () => {
  return (
    <div className="page">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AccountPageLayout;
