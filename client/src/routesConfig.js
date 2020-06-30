import React from "react";
import { Route, Redirect, Link } from "react-router-dom";

export default ({
  component: Component,
  layout: Layout,
  authenticate,
  user,
  ...rest
}) => {
  switch (authenticate) {
    case "user":
      return user.isLogin ? (
        <Route
          {...rest}
          render={() => (
            <Layout>
              <Component />
            </Layout>
          )}
        />
      ) : (
        <Redirect to="/user/login" />
      );
    case "admin":
      return user.isLogin && user.role === "admin" ? (
        <Route
          {...rest}
          render={() => (
            <Layout>
              <Component />
            </Layout>
          )}
        />
      ) : (
        <div
          className="notfound flex-box"
          style={{
            height: "60vh",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Can not access route! Admin right required!
          <Link to="/user/profile" className="format-anchor">
            Go back
          </Link>
        </div>
      );
    default:
      return (
        <Route
          {...rest}
          render={() => (
            <Layout>
              <Component />
            </Layout>
          )}
        />
      );
  }
};
