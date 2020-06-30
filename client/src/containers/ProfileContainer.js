import React, { useState } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import {
  logoutImplement,
  updateUserImplement,
} from "../redux/actions/userAction";
import Profile from "../components/pages/Profile";

const ProfileContainer = ({ user, logoutImplement, updateUserImplement }) => {
  const [isUserUpdate, setIsUserUpdate] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: user.userName,
    phone: user.phone,
    address: user.address,
  });
  const alert = useAlert();
  const updateUser = async (e) => {
    e.preventDefault();
    setIsUserUpdate(!isUserUpdate);
    if (isUserUpdate) {
      let updateInfo = {};
      let { userName, phone, address } = userInfo;
      if (userName !== user.userName) {
        updateInfo.userName = userName;
      }
      if (phone !== user.phone) {
        updateInfo.phone = phone;
      }
      if (address !== user.address) {
        updateInfo.address = address;
      }
      if (Object.keys(updateInfo).length > 0) {
        let result = await updateUserImplement(updateInfo);
        if (result.error) {
          result.error[0] === "userName"
            ? alert.error("Invalid user name")
            : result.error[0] === "phone"
            ? alert.error("Invalid phone number")
            : alert.error("Something went wrong");
        }
        if (result.success) {
          alert.success("Update success!");
        }
      }
    }
  };
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Profile
      updateUser={updateUser}
      userInfo={userInfo}
      isUserUpdate={isUserUpdate}
      handleChange={handleChange}
      logoutImplement={logoutImplement}
      user={user}
      setUserInfo={setUserInfo}
    />
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user,
  };
};

export default connect(mapStateToProps, {
  logoutImplement,
  updateUserImplement,
})(ProfileContainer);
