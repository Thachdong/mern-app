import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClear } from "react-icons/md";
import { useAlert } from "react-alert";
import Register from "../components/pages/Register";
import { registerSchema } from "../validators";
import Pagination from "../components/utils/Pagination";

const AdminUsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [page, setPage] = useState(1);
  const alert = useAlert();
  const authInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const loginUser = JSON.parse(localStorage.getItem("user"));
      let users = await axios.get("/user/users", {
        headers: { Authorization: `Bearer ${loginUser.authorization}` },
      });
      setUsers(users.data.Success.data);
      setIsLoading(false);
    })();
  }, []);

  const removeUser = async (userId) => {
    setIsLoading(true);
    let deletedUser = await axios.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${authInfo.authorization}`,
      },
    });
    if (deletedUser.data.Success) {
      const reduceUsers = users.filter((user) => user._id !== userId);
      setUsers(reduceUsers);
    }
    setIsLoading(false);
    return;
  };

  const registerAdmin = async (e) => {
    e.preventDefault();
    const validInput = registerSchema.validate(formValue);
    if (validInput.error) {
      setError(validInput.error.details[0].path[0]);
      return;
    } else {
      setError("");
    }
    setIsLoading(true);
    try {
      await axios.post(`/user/register-admin`, validInput.value, {
        headers: {
          Authorization: `Bearer ${authInfo.authorization}`,
        },
      });
    } catch (error) {
      setError(400);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    alert.success("Admin Added");
    return;
  };

  const itemsPerpage = 5;
  const totalPage = Math.ceil(users.length / itemsPerpage);
  const start = (page - 1) * itemsPerpage;
  const end = page * itemsPerpage;
  const usersToRender = users.slice(start, end);

  return (
    <div className="container admin__users">
      {isLoading && (
        <div className="preloader flex-box">
          <div></div>
        </div>
      )}
      <div className="table-wrapper">
        <h3>Users List</h3>
        {users.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>No</th>
                <th>Id</th>
                <th>Username</th>
                <th>phone</th>
                <th>role</th>
                <th>isLogin</th>
                <th>Address</th>
                <th>Orders</th>
                <th>Remove</th>
              </tr>
              {usersToRender.map((user, index) => (
                <tr className={user.isLogin ? "green" : ""} key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.isLogin ? "True" : "False"}</td>
                  <td className="text-left">{user.address}</td>
                  <td className="text-left">{user.order.join(", ")}</td>
                  <td onClick={() => removeUser(user._id)}>
                    <MdClear />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="9">
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
      </div>
      <div style={{ marginTop: "1rem" }}>
        <Register
          error={error}
          formValue={formValue}
          setFormValue={setFormValue}
          handleRegister={registerAdmin}
        />
      </div>
    </div>
  );
};

export default AdminUsersContainer;
