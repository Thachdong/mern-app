import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
//Build in modules
import { registerImplement } from "../redux/actions/userAction";
import Register from "../components/pages/Register";

const RegisterContainer = ({ user, registerImplement }) => {
  const [formValue, setFormValue] = useState({});
  const [error, setErrors] = useState("");
  const history = useHistory();
  const alert = useAlert();
  if (user.isLogin) {
    history.push("/user/profile");
  }
  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerImplement(formValue);
    if (result.error) {
      setErrors(result.error[0]);
    }
    if (result.success) {
      alert.success("Register success");
    }
  };
  return (
    <Register
      error={error}
      setFormValue={setFormValue}
      formValue={formValue}
      handleRegister={handleRegister}
    />
  );
};
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps, { registerImplement })(
  RegisterContainer
);
