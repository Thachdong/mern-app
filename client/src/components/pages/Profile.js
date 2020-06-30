import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "../../containers/utils/dateFormat";
const Profile = ({
  updateUser,
  userInfo,
  isUserUpdate,
  logoutImplement,
  handleChange,
  user,
}) => (
  <div className="container profile">
    <div className="profile__info">
      <form>
        <h3>Welcome</h3>
        <div className="form-group">
          <label className="flex-box">
            <span>Username:</span>
            <input
              onChange={handleChange}
              value={userInfo.userName}
              name="userName"
              disabled={isUserUpdate ? false : true}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="flex-box">
            <span>Phone number:</span>
            <input
              onChange={handleChange}
              value={userInfo.phone}
              name="phone"
              disabled={isUserUpdate ? false : true}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="flex-box address">
            <span>Address:</span>
            <textarea
              onChange={handleChange}
              value={userInfo.address}
              name="address"
              disabled={isUserUpdate ? false : true}
            />
          </label>
        </div>
        <div className="form-action">
          <button onClick={updateUser}>
            {isUserUpdate ? "Update" : "Edit"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              logoutImplement();
            }}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
    <div className="profile__order">
      <h3>Orders list</h3>
      {user.order.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <tbody>
              <tr>
                <th>No</th>
                <th>Order Id</th>
                <th>Items</th>
                <th>Created at</th>
                <th>Status</th>
              </tr>
              {user.order.map((ord, index) => (
                <tr key={ord._id} className={ord.status}>
                  <td>{index + 1}</td>
                  <td>{ord._id}</td>
                  <td>
                    {ord.items.map((item) => (
                      <p key={item._id}>
                        <Link
                          className="format-anchor"
                          to={`/products/${item.item}`}
                        >
                          {item.item} - (Qty: {item.qty})
                        </Link>
                      </p>
                    ))}
                  </td>
                  <td>{dateFormat(ord.createdAt * 1)}</td>
                  <td>{ord.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You have not order</p>
      )}
    </div>
  </div>
);

export default Profile;
