import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_UPDATE,
  CLEAR_CART,
} from "./actiontype";
import { updateProduct } from "./productAction";
import store from "../store";

export const addToCart = (itemId, qty) => ({
  type: ADD_TO_CART,
  itemId,
  qty,
});

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  itemId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const cartUpdate = (itemId, qty) => ({
  type: CART_UPDATE,
  itemId,
  qty,
});

/**
 * 1. Check item inCart?
 * 2.1. True: call cartItemIncrease action
 * 2.2. False: call addToCart action
 * 3. Storing cart into localstorage
 */
export const addToCartImplement = (itemId, qty, updateInfo) => {
  return (dispatch) => {
    const cart = store.getState().cart;
    const inCart = cart.find(({ item }) => item === itemId);
    if (inCart) {
      dispatch(cartUpdate(itemId, inCart.qty + qty));
      localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    } else {
      dispatch(addToCart(itemId, qty));
      localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    }
    dispatch(updateProduct(itemId, updateInfo));
  };
};

/**
 * Remove an item from cart and restore product stock
 */
export const removeCartImplement = (itemId, updateInfo) => {
  return (dispatch) => {
    dispatch(removeFromCart(itemId));
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    dispatch(updateProduct(itemId, updateInfo));
  };
};

/**
 * Update cart item
 * 1. Increase by one unit
 * 2. Decrease by one unit
 * 3. Update quantity
 * ==> Restore product stock
 */
export const cartUpdateImplement = (itemId, qty, updateInfo) => {
  return (dispatch) => {
    dispatch(cartUpdate(itemId, qty));
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
    dispatch(updateProduct(itemId, updateInfo));
  };
};
