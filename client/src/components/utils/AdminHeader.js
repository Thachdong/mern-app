import React from "react";
import { NavLink } from "react-router-dom";

const AdminHeader = () => (
  <nav className="admin__header">
    <ul className="container">
      <li>
        <NavLink
          activeClassName="activeLink"
          className="format-anchor"
          to="/admin/products"
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="activeLink"
          className="format-anchor"
          to="/admin/users"
        >
          Users
        </NavLink>
      </li>
      <li>
        <NavLink
          activeClassName="activeLink"
          className="format-anchor"
          to="/admin/orders"
        >
          Orders
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AdminHeader;
