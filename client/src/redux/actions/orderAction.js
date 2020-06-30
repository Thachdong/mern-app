import axios from "axios";
import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAIL,
} from "./actiontype";
import { clearCart } from "./cartAction";
import { orderSchema } from "../../validators";

export const setOrderRrequest = () => ({
  type: SET_ORDER_REQUEST,
});

export const setOrderSuccess = (order) => ({
  type: SET_ORDER_SUCCESS,
  order,
});

export const setOrderFail = (error) => ({
  type: SET_ORDER_FAIL,
  error,
});

/**
 * 1. Validate order
 * 2. Post request
 * 3. Remove items out of redux cart and localstorage
 */
export const addOrderImplement = (order) => {
  return async (dispatch) => {
    dispatch(setOrderRrequest());
    const validOrder = orderSchema.validate(order);
    if (validOrder.error) {
      dispatch(setOrderFail({ error: validOrder.error.details[0].path }));
      return {
        error: validOrder.error.details[0].path[0],
        message: validOrder.error,
      };
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const createdOrder = await axios.post(
        "/order/add",
        { ...order },
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      );
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch(clearCart());
      dispatch(setOrderSuccess(createdOrder));
      return order;
    } catch (error) {
      dispatch(setOrderFail(error));
      return error;
    }
  };
};
