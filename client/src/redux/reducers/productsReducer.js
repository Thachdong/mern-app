const initState = {
  isLoading: false,
  data: [],
  error: "",
  searchTerm: "",
};

const products = (state = initState, action) => {
  switch (action.type) {
    case "SET_PRODUCT_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_PRODUCT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: [...action.products],
      };
    case "SET_PRODUCT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        data: state.data.map((product) =>
          product._id === action.productId
            ? { ...product, ...action.updateInfo }
            : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((product) => product._id !== action.productId),
      };
    case "SEARCH_PRODUCT":
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    default:
      return state;
  }
};

export default products;
