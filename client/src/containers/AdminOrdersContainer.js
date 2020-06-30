import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import formatDate from "./utils/dateFormat";
import Pagination from "../components/utils/Pagination";

const AdminOrdersContainer = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("new");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const alert = useAlert();
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const filteredOrder =
    filter === "all"
      ? [...orders]
      : orders.filter((order) => order.status === filter);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const loginUser = JSON.parse(localStorage.getItem("user"));
      let result = await axios.get("/order/all", {
        headers: {
          Authorization: `Bearer ${loginUser.authorization}`,
        },
      });
      if (result.data.Success) {
        setOrders(result.data.Success.data);
        setIsLoading(false);
      }
      // } else {
      //   alert.error("fetch orders fail", { timeout: 5000 });
      // }
    })();
  }, []);

  const updateStatus = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (id.length !== 24) {
      setError({ field: "id", message: "Invalid order id" });
      setIsLoading(false);
      return;
    }
    let validId = orders.find((order) => order._id === id);
    if (!validId) {
      setError({ field: "id", message: "Id Not Found!" });
      setIsLoading(false);
      return;
    }
    const result = await axios.patch(
      `/order/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${loginUser.authorization}`,
        },
      }
    );
    if (result.data.Success) {
      alert.success("Update success");
      await setTimeout(() => window.location.reload(false), 1000);
    }
    if (result.data.Error) {
      setError({ field: "id", message: result.data.Error.message });
    }
    setIsLoading(false);
    return;
  };

  const itemsPerpage = 5;
  const totalPage = Math.ceil(filteredOrder.length / itemsPerpage);
  const start = (page - 1) * itemsPerpage;
  const end = page * itemsPerpage;
  const ordersToRender = filteredOrder.slice(start, end);

  return (
    <div className="container table-wrapper admin__orders">
      <div className={isLoading ? "preloader flex-box" : ""}>
        <div></div>
      </div>
      <h3 style={{ margin: "1rem 0" }}>Orders list</h3>
      <label style={{ display: "block", marginBottom: "1rem" }}>
        <span>Status: </span>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="new">new</option>
          <option value="checked">checked</option>
          <option value="shipping">shipping</option>
          <option value="paid">paid</option>
        </select>
      </label>
      {orders.length > 0 && (
        <table>
          <tbody>
            <tr>
              <th>No</th>
              <th>Id</th>
              <th>Owner</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Items</th>
              <th>CreatedAt</th>
              <th>Status</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
            {ordersToRender.length === 0 ? (
              <tr>
                <td colSpan="12">{`We have no order with status: "${filter}"`}</td>
              </tr>
            ) : (
              ordersToRender.map((order, index) => (
                <tr key={order._id} className={order.status}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.owner}</td>
                  <td>{order.phone}</td>
                  <td>{order.shippingAddress}</td>
                  <td>
                    {order.items.map((item) => (
                      <p key={item._id}>
                        <span>{item.item}</span>&nbsp;
                        <span>{` - qty: ${item.qty}`}</span>
                      </p>
                    ))}
                  </td>
                  <td>{formatDate(order.createdAt * 1)}</td>
                  <td>{order.status}</td>
                  <td>{order.totalPrice}$</td>
                  <td>{order.tax}$</td>
                  <td>{order.totalPrice + order.tax}$</td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan="11">
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPage={totalPage}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <form>
        <fieldset>
          <legend>Update status</legend>
          {error.field === "id" && (
            <p
              style={{ color: "red", textAlign: "center", fontSize: ".85rem" }}
            >
              {error.message}
            </p>
          )}
          <label className="flex-box">
            <span>Order Id:</span>
            <input
              className={error.field === "id" ? "error" : ""}
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
          <label className="flex-box">
            <span>Select:</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="new">new</option>
              <option value="checked">checked</option>
              <option value="shipping">shipping</option>
              <option value="paid">paid</option>
            </select>
          </label>
          <button onClick={updateStatus}>Update</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AdminOrdersContainer;
