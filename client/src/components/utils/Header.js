import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { GiShoppingCart } from "react-icons/gi";
import { IoIosLogIn, IoIosSearch } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

import { searchProduct } from "../../redux/actions/productAction";

const Header = ({ cartItems, searchProduct, user, products }) => (
  <div className="header">
    {user.isLoading ||
      (products.isLoading && (
        <div className="preloader flex-box">
          <div></div>
        </div>
      ))}
    <div className="container flex-box">
      <div className="header__brand">
        <h3>
          <Link className="format-anchor" to="/">
            Baradas
          </Link>
        </h3>
      </div>
      <div className="header__search-box">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => searchProduct(e.target.value)}
            placeholder="Enter your search term ..."
          />
          &nbsp;
          <button type="submit">
            <IoIosSearch />
          </button>
        </form>
      </div>
      <div className="header__cart-box flex-box">
        <Link className="format-anchor" to="/cart">
          <GiShoppingCart />
          <span>{cartItems}</span>
        </Link>
      </div>
      <div className="header__login-box">
        {user.isLogin ? (
          <Link className="format-anchor" to="/user/profile">
            <FaUserCheck />
          </Link>
        ) : (
          <Link className="format-anchor" to="/user/login">
            <IoIosLogIn />
          </Link>
        )}
      </div>
    </div>
  </div>
);
const mapStateToProps = ({ cart, user, products }) => {
  const cartItems = cart.reduce((sum, { qty }) => sum + qty, 0);
  return {
    cartItems,
    user,
    products,
  };
};

const mapDispatchToProps = {
  searchProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
