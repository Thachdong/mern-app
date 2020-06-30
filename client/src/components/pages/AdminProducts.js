import React from "react";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";
import Pagination from "../utils/Pagination";

const AdminProducts = ({
  products,
  name,
  setName,
  price,
  setPrice,
  stock,
  setStock,
  disc,
  setDisc,
  productId,
  onProductIdChange,
  error,
  setImage,
  handleAddProduct,
  handleRemove,
  handleUpdate,
  renderError,
  page,
  setPage,
  totalPage,
}) => (
  <div className="admin__products">
    <div className="container">
      <h3>Products list</h3>
      <div className="table-wrapper">
        {products.length > 0 ? (
          <table>
            <tbody>
              <tr>
                <th>No</th>
                <th>Product Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Created at</th>
                <th>Remove</th>
              </tr>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td className="text-left">{product._id}</td>
                  <td className="text-left">
                    <Link
                      className="format-anchor"
                      to={`/products/${product._id}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td>{product.price}$</td>
                  <td>{product.stock}</td>
                  <td>{product.created_at ? product.created_at : ""}</td>
                  <td
                    className="remove"
                    onClick={() => handleRemove(product._id)}
                  >
                    <MdClear />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalPage={totalPage}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="mute">We have no items to sell</p>
        )}
      </div>
      <form encType="multipart/form-data">
        <h3>Action Form</h3>
        <label>
          <span>Product Id (Only for update) {renderError("productId")}</span>
          <input
            className={error.field === "productId" ? "error" : ""}
            value={productId}
            placeholder="Product Id"
            onChange={onProductIdChange}
          />
        </label>
        <label>
          <span>Name {renderError("name")}</span>
          <input
            className={error.field === "name" ? "error" : ""}
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Price {renderError("price")}</span>
          <input
            className={error.field === "price" ? "error" : ""}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          <span>Stock {renderError("stock")}</span>
          <input
            className={error.field === "stock" ? "error" : ""}
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </label>
        <label>
          <span>Discription {renderError("disc")}</span>
          <textarea
            className={error.field === "disc" ? "error" : ""}
            placeholder="Discription"
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
          />
        </label>
        <label>
          <span>Product images {renderError("image")}</span>
          <br></br>
          <input
            required
            type="file"
            name="image"
            multiple
            onChange={(e) => setImage(e.target.files)}
          />
        </label>
        <div className="cta-box">
          <button onClick={handleAddProduct} type="submit">
            Add
          </button>
          &nbsp;
          <button onClick={handleUpdate} type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AdminProducts;
