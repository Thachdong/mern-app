import React, { useState } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import AdminProducts from "../components/pages/AdminProducts";
import {
  addProduct,
  updateProductImplement,
  deleteProductHandle,
} from "../redux/actions/productAction";

const AdminProductsContainer = ({
  products,
  addProduct,
  updateProductImplement,
  deleteProductHandle,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [disc, setDisc] = useState("");
  const [productId, setProductId] = useState("");
  const [image, setImage] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const alert = useAlert();

  const cloudinaryUpload = async (files) => {
    return await Promise.all(
      files.map(async (file) => {
        let formData = new FormData();
        formData.append("upload_preset", "ecommerce");
        formData.append("file", file);
        const url = await axios.post(
          "https://api.cloudinary.com/v1_1/dongthach/upload",
          formData
        );
        return url.data.secure_url;
      })
    );
  };

  const errorHandler = (result) => {
    if (result.error) {
      if (result.error.hasOwnProperty("message")) {
        alert.error("Product exist!", { timeout: 5000 });
        setError({ field: "name", message: "Product name already exist!" });
        return;
      }
      setError({
        field: result.error[0],
        message: `Invalid ${result.error[0]}`,
      });
      alert.error("Add product fail", { timeout: 3000 });
    } else {
      alert.success("Product added", { timeout: 3000 });
    }
    return;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let files = [...image];
    let isExist =
      products.length > 0
        ? products.find((product) => product.name === name)
        : false;
    if (isExist) {
      setError("name");
      alert.error("Product exist");
      setError({ field: "name", message: "Product already exist!" });
      setIsLoading(false);
      return;
    }
    const urls = await cloudinaryUpload(files);
    const productInfo = {
      image: urls,
      name,
      price,
      stock,
      disc,
    };
    const result = await addProduct(productInfo, products.data);
    setIsLoading(false);
    errorHandler(result);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let product = products.find((p) => p._id === productId);
    let updateInfo = {};
    if (product) {
      setIsLoading(true);
      const files = [...image];
      const urls = files.length && (await cloudinaryUpload(files));
      product.name !== name && (updateInfo.name = name);
      product.price !== price && (updateInfo.price = price);
      product.stock !== stock && (updateInfo.stock = stock * 1);
      product.disc !== disc && (updateInfo.disc = disc);
      urls.length && (updateInfo.image = urls);
      let result = await updateProductImplement(product._id, updateInfo);
      errorHandler(result);
      setIsLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    const isConfirm = prompt("Delete product ?", true);
    if (isConfirm) {
      let result = await deleteProductHandle(productId);
      if (result.error) {
        alert.error("Remove fail");
      } else {
        alert.success("Remove success");
        window.location.reload(false);
      }
    }
  };

  const onProductIdChange = (e) => {
    let _id = e.target.value;
    setProductId(_id);
    if (_id.length === 24) {
      error.field === "productId" && setError("");
      let product = products.find((p) => p._id === _id);
      if (product) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDisc(product.disc);
      }
    } else {
      setError({ field: "productId", message: "Invalid productId" });
    }
  };

  const renderError = (field) => {
    return error.field === field ? (
      <span
        style={{ color: "red", display: "inline" }}
      >{`(*${error.message})`}</span>
    ) : (
      ""
    );
  };

  const itemsPerpage = 5;
  const totalPage = Math.ceil(products.data.length / itemsPerpage);
  const start = (page - 1) * itemsPerpage;
  const end = page * itemsPerpage;
  const productToRender = products.data.slice(start, end);

  return (
    <div>
      <div className={isLoading ? "preloader flex-box" : ""}>
        <div></div>
      </div>
      <AdminProducts
        products={productToRender}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        stock={stock}
        setStock={setStock}
        disc={disc}
        setDisc={setDisc}
        image={image}
        setImage={setImage}
        error={error}
        renderError={renderError}
        productId={productId}
        onProductIdChange={onProductIdChange}
        handleAddProduct={handleAddProduct}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
      />
    </div>
  );
};

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = {
  addProduct,
  updateProductImplement,
  deleteProductHandle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductsContainer);
