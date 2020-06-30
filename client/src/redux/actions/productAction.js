import axios from "axios";
import {
  SET_PRODUCT_REQUEST,
  SET_PRODUCT_SUCCESS,
  SET_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
} from "./actiontype";
import store from "../store";
import { productSchema, productUpdateSchema } from "../../validators";

export const setProductRequest = () => ({
  type: SET_PRODUCT_REQUEST,
});

export const setProductSuccess = (products) => ({
  type: SET_PRODUCT_SUCCESS,
  products,
});

export const setProductFail = (error) => ({
  type: SET_PRODUCT_FAIL,
  error,
});

export const updateProduct = (productId, updateInfo) => ({
  type: UPDATE_PRODUCT,
  productId,
  updateInfo,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const searchProduct = (searchTerm) => ({
  type: SEARCH_PRODUCT,
  searchTerm,
});

/**
 * 1. Fetch products
 * 2. Get cart
 * 3. Check product inCart?
 * 4.1. True: Minus stock to item qty ==> init state
 * 4.2. False: init state
 */
export const fetchProduct = () => {
  return async (dispatch) => {
    try {
      dispatch(setProductRequest());
      let products = await axios.get("/product/products");
      products = products.data.Success.data;
      const cartItems = store.getState().cart;
      if (cartItems.length === 0) {
        dispatch(setProductSuccess(products));
      }
      let updateProduct = products.map((product) => {
        const item = cartItems.find(({ item }) => item === product._id);
        if (!item) {
          return product;
        }
        return {
          ...product,
          stock: product.stock - item.qty < 0 ? 0 : product.stock - item.qty,
        };
      });
      dispatch(setProductSuccess(updateProduct));
    } catch (error) {
      dispatch(setProductFail(error.message));
    }
  };
};

/**
 * 1. Validate input
 * 2. Make post request
 * 3. Update store
 */
export const addProduct = (productInfo, products) => {
  return async (dispatch) => {
    dispatch(setProductRequest());
    const validProductInfo = productSchema.validate(productInfo);
    if (validProductInfo.error) {
      const error = validProductInfo.error.details[0].path;
      dispatch(setProductFail(error));
      return { error };
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let newProduct = await axios.post("/product/add", productInfo, {
        headers: {
          Authorization: `Bearer ${user.authorization}`,
        },
      });
      newProduct = newProduct.data.Success.data;
      const productList = [...products, newProduct];
      dispatch(setProductSuccess(productList));
      return newProduct;
    } catch (error) {
      let err = error.response.data.Error;
      dispatch(setProductFail(err));
      return { error: err };
    }
  };
};

/**
 * 1. Validate input
 * 2. Make post request
 * 3. Update store
 */
export const updateProductImplement = (productId, updateInfo) => {
  return async (dispatch) => {
    dispatch(setProductRequest());
    const validUpdateInfo = productUpdateSchema.validate(updateInfo);
    if (validUpdateInfo.error) {
      const error = validUpdateInfo.error.details[0].path;
      dispatch(setProductFail(error));
      return { error };
    }
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let updatedProduct = await axios.patch(
        `/product/${productId}`,
        updateInfo,
        {
          headers: {
            Authorization: `Bearer ${user.authorization}`,
          },
        }
      );
      updatedProduct = updatedProduct.data.Success.data;
      dispatch(updateProduct(updatedProduct._id, updatedProduct));
      return updateProduct;
    } catch (error) {
      let err = error.response.data.Error;
      dispatch(setProductFail(err));
      return { error: err };
    }
  };
};

export const deleteProductHandle = (productId) => {
  return async (dispatch) => {
    dispatch(setProductRequest());
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      let deletedProduct = await axios.delete(`/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.authorization}`,
        },
      });
      deletedProduct = deletedProduct.data.Success.data;
      dispatch(deleteProduct(deletedProduct._id));
      return deletedProduct;
    } catch (error) {
      dispatch(setProductFail(error));
      return { error };
    }
  };
};
