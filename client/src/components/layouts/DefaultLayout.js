import React from "react";
import { FaFacebookMessenger } from "react-icons/fa";

import Header from "../utils/Header";
import Footer from "../utils/Footer";

const DefaultLayout = ({ children }) => (
  <div className="layout">
    <Header />
    <div className="content">{children}</div>
    <a className="format-anchor chat-icon" href="http://m.me/<PAGE_NAME>">
      <FaFacebookMessenger />
    </a>
    <Footer />
  </div>
);

export default DefaultLayout;
