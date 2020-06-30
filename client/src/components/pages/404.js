import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container notfound">
    <p>Page not found! Please try again with correct url</p>
    <Link to="/">Bring me back!</Link>
  </div>
);

export default NotFound;
