import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import Order from "../components/pages/Order";
import { addOrderImplement } from "../redux/actions/orderAction";

const OrderContainer = ({ cart, user, products, addOrderImplement }) => {
  const history = useHistory();
  const alert = useAlert();
  const [userInfo, setUserInfo] = useState({
    address: user.address,
    phone: user.phone,
  });
  const [error, setError] = useState("");
  user.isLogin === false && history.push("/user/login", { from: "/order" });
  const cartItems = cart.map(({ item, qty }) => {
    const cartItem = products.find((product) => product._id === item);
    return {
      ...cartItem,
      price: cartItem ? cartItem.price.replace(/[$]/, "") : null,
      qty,
    };
  });
  const orderItems = cartItems.map((item) => ({
    item: item._id,
    qty: item.qty,
  }));
  const totalPrice = cartItems.reduce(
    (sum, { qty, price }) => sum + qty * price,
    0
  );
  const VAT = (totalPrice * 10) / 100;
  const orderHandle = async (e) => {
    e.preventDefault();
    const newOrder = {
      items: [...orderItems],
      owner: user._id,
      totalPrice,
      tax: VAT * 1,
      shippingAddress: userInfo.address,
      phone: userInfo.phone,
    };
    let result = await addOrderImplement(newOrder);
    if (result.error) {
      setError(result.error);
      alert.error(`Invalid ${result.error}`);
    } else {
      alert.success("Order added");
      history.push("/user/profile");
    }
  };

  return (
    <Order
      cartItems={cartItems}
      price={totalPrice}
      VAT={VAT}
      orderHandle={orderHandle}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
      error={error}
    />
  );
};

const mapStateToProps = ({ cart, user, products }) => ({
  cart,
  user: user,
  products: products.data,
});
const mapDispatchToProps = { addOrderImplement };

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
