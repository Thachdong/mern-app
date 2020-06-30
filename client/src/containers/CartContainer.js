import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
//Build in modules
import {
  removeCartImplement,
  cartUpdateImplement,
} from "../redux/actions/cartAction";
import { addOrderImplement } from "../redux/actions/orderAction";
import Cart from "../components/pages/Cart";

const CartContainer = ({
  cart,
  products,
  user,
  removeCartImplement,
  cartUpdateImplement,
}) => {
  const [itemQty, setItemQty] = useState();
  const alert = useAlert();
  const history = useHistory();
  const { location } = history;
  /**
   * 1. Get infomation of cart's items
   * 2. Calculate total items, total price, VAT
   * 3. Onchange callback
   */
  const cartItems = cart.map(({ item, qty }) => {
    const cartItem = products.data.find((product) => product._id === item);
    return {
      ...cartItem,
      price: cartItem ? cartItem.price.replace(/[$]/, "") : null,
      qty,
    };
  });
  const cartCount = cart.reduce((sum, { qty }) => sum + qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, { qty, price }) => sum + qty * price,
    0
  );
  const VAT = (totalPrice * 10) / 100;

  const updateCartItem = (e, item) => {
    let totalStock = item.stock + item.qty;
    let value =
      e.target.value > totalStock
        ? totalStock
        : e.target.value < 0
        ? 1
        : e.target.value;
    let qty = value * 1;
    if (qty !== item.qty) {
      let stock = item.stock + (item.qty - qty);
      setItemQty({ [e.target.name]: value });
      cartUpdateImplement(item._id, qty, { stock });
      alert.success("Update success");
    }
  };

  const orderRedirect = () => {
    if (!user.isLogin) {
      history.push("/user/login", { from: "/order" });
    }
    if (cart.length < 1) {
      alert.error("Cart is empty");
      history.push(location.pathname);
    }
  };
  return (
    <Cart
      cartCount={cartCount}
      cartItems={cartItems}
      removeCartImplement={removeCartImplement}
      updateCartItem={updateCartItem}
      orderRedirect={orderRedirect}
      itemQty={itemQty}
      totalPrice={totalPrice}
      VAT={VAT}
      alert={alert}
    />
  );
};

const mapStateToProps = ({ cart, products, user }) => ({
  cart,
  products,
  user,
});

const mapDispatchToProps = {
  removeCartImplement,
  cartUpdateImplement,
  addOrderImplement,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
