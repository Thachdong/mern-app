import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Order = ({
  cartItems,
  price,
  VAT,
  userInfo,
  setUserInfo,
  orderHandle,
  error,
}) => (
  <div className="order container">
    <form onSubmit={orderHandle}>
      <div className="order__nav flex-box">
        <div className="backToCart">Add items</div>
        <div className="fullfill">Fullfillment</div>
      </div>
      <fieldset>
        <legend>Items</legend>
        <ol>
          {cartItems.map((item) => (
            <li key={item._id + item.name}>
              <Link to={`/products/${item._id}`} className="format-anchor">
                <span>{item.name}</span>&nbsp;
                <span>- Qty: {item.qty}</span>
              </Link>
            </li>
          ))}
        </ol>
        <p>{`Tax: ${VAT}$`}</p>
        <p>{`Total: ${price + VAT}$`}</p>
      </fieldset>
      <fieldset>
        <legend>Shipping address</legend>
        <label>
          <span>Address:</span>
          <textarea
            className={error === "shippingAddress" ? "error" : ""}
            placeholder="Enter your address"
            value={userInfo.address}
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
            name="address"
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Contact</legend>
        <label>
          <span>Phone number:</span>
          <input
            className={error === "phone" ? "error" : ""}
            placeholder="Enter your Phone numbers"
            value={userInfo.phone}
            onChange={(e) =>
              setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
            }
            name="phone"
          />
        </label>
      </fieldset>
      <div className="order__action flex-box">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
);

Order.propTypes = {
  cartItems: PropTypes.array,
  price: PropTypes.number,
  VAT: PropTypes.number,
  userInfo: PropTypes.object,
  setUserInfo: PropTypes.func,
};

export default Order;
