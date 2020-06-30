const initState = {
  isLoading: false,
  error: null,
  userName: "",
  address: "",
  phone: "",
  isLogin: false,
  order: [],
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        ...action.setUserInfo,
      };
    case "SET_USER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default user;
