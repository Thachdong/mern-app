import React from "react";
import AdminHeader from "../utils/AdminHeader";

const AdmindLayout = ({ children }) => (
  <div className="admin">
    <AdminHeader />
    <div className="adminChildren">{children}</div>
  </div>
);

export default AdmindLayout;
