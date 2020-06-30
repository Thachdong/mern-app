import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowGoBackLine } from "react-icons/ri";

const ProductDetail = ({
  qty,
  setQty,
  product,
  alert,
  slickSettings,
  addToCartImplement,
}) => {
  return (
    <>
      {product ? (
        <div className="container product-detail">
          <div className="product-detail__slider">
            <Slider {...slickSettings}>
              {product.image.map((img) => (
                <img key={img} src={img} alt="product" />
              ))}
            </Slider>
          </div>
          <div className="product-detail__info">
            <h3>{product.name}</h3>
            <p>Product code: {product._id}</p>
            <p>{product.disc}</p>
            <p>
              Price: <span className="price">{product.price}$</span>
            </p>
            <p className="stock">
              {product.stock > 0 ? "Instock" : "Out of Stock"}
            </p>
            <div className="flex-box">
              <span>Qty</span>&nbsp;
              <input
                value={qty}
                onChange={(e) => {
                  let value =
                    e.target.value > product.stock
                      ? product.stock
                      : e.target.value;
                  setQty(value);
                }}
                type="number"
                min={1}
                max={product.stock}
              />
            </div>
            <div className="flex-box action-box">
              <button
                disabled={product.stock > 0 ? false : true}
                onClick={() => {
                  const updateInfo = { stock: product.stock - qty };
                  addToCartImplement(product._id, qty * 1, updateInfo);
                  alert.success("Add success");
                }}
              >
                Add to Cart
              </button>
              {/* <button>Buy Now</button> */}
            </div>
            <Link to="/" className="format-anchor flex-box">
              <RiArrowGoBackLine />
              &nbsp;
              <span>Go back</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="not-found">
          Page not found! Please try again with correct url
        </div>
      )}
    </>
  );
};

export default ProductDetail;
