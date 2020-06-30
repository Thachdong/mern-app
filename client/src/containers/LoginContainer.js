import { connect } from "react-redux";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

import Login from "../components/pages/Login";
import { loginImplement } from "../redux/actions/userAction";

const LoginContainer = ({ user, loginImplement }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();
  const history = useHistory();
  const { location } = history;
  if (user.isLogin) {
    location.state
      ? history.push(location.state.from)
      : history.push("/user/profile");
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    let result = await loginImplement({
      phone,
      password,
    });
    if (result.error) {
      result.error[0] === "phone"
        ? alert.error("Invalid phone number")
        : result.error[0] === "password"
        ? alert.error("Invalid password")
        : alert.error("Phone or Password wrong");
    }
    if (result.success) {
      alert.success("Login success!");
      location.state ? history.push(location.state.from) : history.push("/");
    }
  };
  return (
    <Login
      phone={phone}
      password={password}
      setPhone={setPhone}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = {
  loginImplement,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
