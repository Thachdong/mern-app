import React from "react";
import { Link } from "react-router-dom";
const Register = ({ error, setFormValue, formValue, handleRegister }) => (
  <div className="login container">
    <form onSubmit={handleRegister}>
      <h3 className="login__label">Register</h3>
      <div className="login__form-group flex-box">
        <label htmlFor="userName">
          <span>Username:</span>&nbsp;
          <span style={{ color: "red", fontSize: ".85rem" }}>
            {error === "userName" ? "(*Invalid username)" : ""}
          </span>
        </label>
        <input
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.userName}
          required
          id="userName"
          name="userName"
          type="text"
          placeholder="Enter your name ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="phone">
          <span>Phone number:</span>&nbsp;
          <span style={{ color: "red", fontSize: ".85rem" }}>
            {error === "phone"
              ? "(*Invalid phone number)"
              : error === 400
              ? "(*Phone number already taken)"
              : ""}
          </span>
        </label>
        <input
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.phone}
          required
          id="phone"
          name="phone"
          type="text"
          placeholder="Enter your phone ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="email">
          <span>Email:</span>&nbsp;
          <span style={{ color: "red", fontSize: ".85rem" }}>
            {error === "email" ? "(*Invalid email)" : ""}
          </span>
        </label>
        <input
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.email}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="password">
          <span>Password:</span>&nbsp;
          <span style={{ color: "red", fontSize: ".85rem" }}>
            {error === "password" ? "(*Invalid password)" : ""}
          </span>
        </label>
        <input
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.password}
          required
          id="password"
          name="password"
          type="password"
          placeholder="Enter password ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="repeatPassword">
          <span>Repeat password:</span>&nbsp;
          <span style={{ color: "red", fontSize: ".85rem" }}>
            {error === "repeatPassword" ? "(*Repeatpassword not matched)" : ""}
          </span>
        </label>
        <input
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.repeatPassword}
          required
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          placeholder="Enter password ..."
        />
      </div>
      <div className="login__form-group flex-box">
        <label htmlFor="address">Address:</label>
        <textarea
          onChange={(e) =>
            setFormValue({ ...formValue, [e.target.name]: e.target.value })
          }
          value={formValue.address}
          id="address"
          name="address"
          required
          placeholder="Enter address ..."
        />
      </div>
      <button type="submit" className="login__form-action">
        Register
      </button>
      <div className="login__form-nav">
        <span>Or login in with your account</span>&nbsp;
        <Link to="/user/login">Login</Link>
        <p>Email usefull for verify account and reset password</p>
      </div>
    </form>
  </div>
);

export default Register;
