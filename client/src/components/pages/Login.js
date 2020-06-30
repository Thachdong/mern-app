import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Login = ({ phone, password, setPhone, setPassword, handleLogin }) => (
  <div className="login container">
    <form>
      <h3 className="login__label">Login</h3>
      <div className="login__form-group flex-box">
        <label htmlFor="phone">Phone number:</label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          id="text"
          name="phone"
          type="text"
          placeholder="Enter your phone ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="password">Password:</label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
          placeholder="Enter password ..."
        />
      </div>
      <button
        type="submit"
        className="login__form-action"
        onClick={handleLogin}
      >
        Login
      </button>
      <div className="login__form-nav">
        <span>You have no account yet?</span>&nbsp;
        <Link to="/user/register">Create One</Link>
      </div>
    </form>
  </div>
);

Login.propTypes = {
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
  handleLogin: PropTypes.func,
};

export default Login;
