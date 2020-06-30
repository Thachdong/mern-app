import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import { addToCartImplement } from "../redux/actions/cartAction";
import ProductDetail from "../components/pages/ProductDetail";

const ProductDetailContainer = ({ products, addToCartImplement }) => {
  const [qty, setQty] = useState(1);
  const { productId } = useParams();
  const alert = useAlert();
  const product = products.data.find((p) => p._id === productId);
  const slickSettings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    lazyLoad: true,
    customPaging: (i) => <img width="50" alt="thumb" src={product.image[i]} />,
  };
  return (
    <ProductDetail
      qty={qty}
      setQty={setQty}
      alert={alert}
      product={product}
      slickSettings={slickSettings}
      addToCartImplement={addToCartImplement}
    />
  );
};

export default connect(({ products }) => ({ products }), {
  addToCartImplement,
})(ProductDetailContainer);
