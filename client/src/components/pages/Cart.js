import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdClear } from "react-icons/md";

const Cart = ({
  cartCount,
  cartItems,
  removeCartImplement,
  updateCartItem,
  orderRedirect,
  itemQty,
  totalPrice,
  VAT,
  alert,
}) => (
  <div className="cart">
    <div className="container">
      <p className="cart__status">You have ({cartCount} items incart)</p>
      <div className="cart__content">
        <div className="table-wrapper">
          {cartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th>No</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>S-Total</th>
                  <th></th>
                </tr>
                {cartItems.map((item, index) => (
                  <tr key={`${item._id} + ${index}`}>
                    <td>{index + 1}</td>
                    <td className="item">
                      <Link
                        className="format-anchor"
                        to={`products/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.price}$</td>
                    <td className="qty">
                      <input
                        onChange={(e) => {
                          updateCartItem(e, item);
                        }}
                        defaultValue={item.qty}
                        value={itemQty ? itemQty[item._id] : item.qty}
                        name={item._id}
                        type="number"
                        min={1}
                        max={item.stock + item.qty || 1000}
                      />
                    </td>
                    <td>{item.price * item.qty}$</td>
                    <td>
                      <MdClear
                        onClick={() => {
                          removeCartImplement(item._id, {
                            stock: item.qty + item.stock,
                          });
                          alert.success("Remove success");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="bill">
          <h4>Your Bill</h4>
          <div className="flex-box">
            <span>Items:</span>
            <span>{totalPrice}$</span>
          </div>
          <div className="flex-box">
            <span>VAT:</span>
            <span>10% - {VAT}$</span>
          </div>
          <div className="flex-box">
            <span>Total:</span>
            <span>{totalPrice + VAT}$</span>
          </div>
          <div className="checkout" onClick={orderRedirect}>
            <Link to="/order" className="format-anchor">
              Checkout
            </Link>
          </div>
        </div>
      </div>
      <Link className="format-anchor flex-box cart__redirect" to="/">
        <RiArrowGoBackLine />
        <span>Go back to get more</span>
      </Link>
    </div>
  </div>
);

Cart.propTypes = {
  cartCount: PropTypes.number,
  cartItems: PropTypes.array,
  removeCartImplement: PropTypes.func,
  orderRedirect: PropTypes.func,
  itemQty: PropTypes.object,
  totalPrice: PropTypes.number,
  VAT: PropTypes.number,
  alert: PropTypes.object,
};

export default Cart;
