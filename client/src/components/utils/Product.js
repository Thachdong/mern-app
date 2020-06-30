import React from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

const Product = ({ image, name, disc, price, stock, _id, onClick }) => {
  const alert = useAlert();
  return (
    <div className="card">
      <Link className="format-anchor" to={`products/${_id}`}>
        <img loading="lazy" src={image[0]} alt={name} width="100" />
      </Link>
      <div className="card__content">
        <Link className="format-anchor card-anchor" to={`products/${_id}`}>
          <h3>{name}</h3>
        </Link>
        <p>{disc}</p>
        <div className="flex-box">
          <span>Price: {price}$</span>
          {stock > 0 ? <span>Stock: {stock}</span> : <span>Out Of Stock</span>}
        </div>
      </div>
      <div className="card__action">
        <button
          disabled={stock > 0 ? false : true}
          onClick={() => {
            onClick();
            alert.success("Add success");
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
