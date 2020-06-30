import React from "react";
import Product from "../utils/Product";

const ProductList = ({ productToRender, addToCartImplement, products }) => (
  <div className="products-list">
    <div className="container">
      {productToRender.length > 0 ? (
        productToRender.map((product) => (
          <Product
            onClick={
              product.stock > 0
                ? () =>
                    addToCartImplement(product._id, 1, {
                      stock: product.stock - 1,
                    })
                : null
            }
            key={product._id}
            {...product}
          />
        ))
      ) : products.data.length > 0 ? (
        <p>Search term does not match. Please try again with another one!</p>
      ) : (
        <p>Can not get products from server. Please check your network</p>
      )}
    </div>
  </div>
);

export default ProductList;
