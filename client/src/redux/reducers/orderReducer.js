const initState = {
  isLoading: false,
  error: null,
  data: {
    owner: "user_id",
    items: [],
    shippingAddress: "",
    phone: "",
    price: "",
    tax: "",
  },
};

const order = (state = initState, action) => {
  switch (action.type) {
    case "SET_ORDER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_ORDER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case "SET_ORDER_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default order;
