import React, { useState } from "react";
import { connect } from "react-redux";

import { addToCartImplement } from "../redux/actions/cartAction";
import ProductList from "../components/pages/ProductList";
import Pagination from "../components/utils/Pagination";

const ProductListContainer = ({ products, addToCartImplement }) => {
  const [page, setPage] = useState(1);
  const filteredProduct = products.data.filter(
    (product) =>
      product.name.toLowerCase().indexOf(products.searchTerm.toLowerCase()) !==
        -1 ||
      product.disc.toLowerCase().indexOf(products.searchTerm.toLowerCase()) !==
        -1
  );
  const itemsPerpage = 6;
  const totalPage = Math.ceil(filteredProduct.length / itemsPerpage);
  const start = (page - 1) * itemsPerpage;
  const end = page * itemsPerpage;
  const productToRender = filteredProduct.slice(start, end);
  return (
    <div>
      <ProductList
        productToRender={productToRender}
        addToCartImplement={addToCartImplement}
        products={products}
      />
      {filteredProduct.length > itemsPerpage ? (
        <Pagination totalPage={totalPage} page={page} setPage={setPage} />
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = ({ products }) => ({ products });
const mapDispatchToProps = {
  addToCartImplement,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListContainer);
