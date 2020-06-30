import axios from "axios";
import {
  loginSchema,
  userUpdateSchema,
  registerSchema,
} from "../../validators";
import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAIL,
} from "./actiontype";

export const setUserRequest = () => ({
  type: SET_USER_REQUEST,
});

export const setUserSuccess = (setUserInfo) => ({
  type: SET_USER_SUCCESS,
  setUserInfo,
});

export const setUserFail = (error) => ({
  type: SET_USER_FAIL,
  error,
});

/**
 * LOGIN IMPLEMENT
 * 1. Validate user info with Joi
 * 2. Post user info to server and get response
 * 3. If success:
 * 3.1 Save access token and user id into localstorage
 * 3.2 Save user info into redux store
 */
export const loginImplement = ({ phone, password }) => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    const validateInfo = loginSchema.validate({ phone, password });
    if (validateInfo.error) {
      dispatch(setUserFail({ error: validateInfo.error.details[0].path }));
      return { error: validateInfo.error.details[0].path };
    }
    try {
      let user = await axios.post("/user/login", { phone, password });
      const saveUser = {
        authorization: user.headers.authorization,
        user: user.data.Success.data._id,
      };
      localStorage.setItem("user", JSON.stringify(saveUser));
      dispatch(setUserSuccess({ ...user.data.Success.data, isLogin: true }));
      return { success: true };
    } catch (error) {
      dispatch(setUserFail({ error: error.response.status }));
      return { error: [error.response.status] };
    }
  };
};

/**
 * REFRESH USER
 * Purpose: fetch user every times browser restart
 */
export const refreshUser = () => {
  return async (dispatch) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        let userInfo = await axios.get(`/user/${user.user}`, {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        });
        dispatch(setUserSuccess(userInfo.data.Success.data));
      }
    } catch (error) {
      dispatch(setUserFail(error));
    }
  };
};

/**
 * LOGOUT IMPLEMENT
 * 1. Post a logout request with a Baerer token headers
 * 2. Remove user info out of locaclstorage
 */
export const logoutImplement = () => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      await axios.post(
        `/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      );
      const resetUser = {
        userName: "",
        address: "",
        phone: "",
        isLogin: false,
        order: [],
      };
      dispatch(setUserSuccess(resetUser));
      localStorage.removeItem("user");
    } catch (error) {
      dispatch(setUserFail(error));
    }
  };
};

/**
 * UPDATE USER IMPLEMENT
 * 1. Validate update info with Joi
 * 2. Make patch request with headers to server
 *
 */
export const updateUserImplement = (updateInfo) => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    const validateInfo = userUpdateSchema.validate(updateInfo);
    if (validateInfo.error) {
      dispatch(setUserFail({ error: validateInfo.error.details[0].path }));
      return { error: validateInfo.error.details[0].path };
    }
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      let updateUser = await axios.patch(`/user/${user.user}`, updateInfo, {
        headers: {
          Authorization: `Bearer ${user.authorization}`,
        },
      });
      dispatch(setUserSuccess(updateUser.data.Success.data));
      return { success: true };
    } catch (error) {
      dispatch(setUserFail(error));
      return { error };
    }
  };
};

/**
 * REGISTER USER
 * 1. Validate register info
 * 2. Make post request
 * 3. Store user info to redux store
 * 4. Save authorization info to localstorage
 */
export const registerImplement = (registerInfo) => {
  return async (dispatch) => {
    dispatch(setUserRequest());
    const isValidInfo = registerSchema.validate(registerInfo);
    if (isValidInfo.error) {
      dispatch(setUserFail({ error: isValidInfo.error.details[0].path }));
      return { error: isValidInfo.error.details[0].path };
    }
    try {
      const user = await axios.post("/user/register-user", isValidInfo.value);
      const saveUser = {
        authorization: user.headers.authorization,
        user: user.data.Success.data._id,
      };
      localStorage.setItem("user", JSON.stringify(saveUser));
      dispatch(setUserSuccess(user.data.Success.data));
      return { success: true };
    } catch (error) {
      dispatch(setUserFail(error.response.data.Error.message));
      return { error: [error.response.status] };
    }
  };
};
