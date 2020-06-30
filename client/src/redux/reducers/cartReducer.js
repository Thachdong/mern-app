const initState = JSON.parse(localStorage.getItem("cart")) || [];

const cart = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        {
          item: action.itemId,
          qty: action.qty,
        },
      ];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.item !== action.itemId);
    case "CART_UPDATE":
      return state.map(({ item, qty }) =>
        item === action.itemId ? { item, qty: action.qty } : { item, qty }
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export default cart;
