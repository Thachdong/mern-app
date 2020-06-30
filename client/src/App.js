//Thirst parties lib
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";
//Layouts and routes config
import DefaultLayout from "./components/layouts/DefaultLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Route from "./routesConfig";
//Pages
import NotFound from "./components/pages/404";
import AdminOrdersContainer from "./containers/AdminOrdersContainer";
import AdminProductsContainer from "./containers/AdminProductsContainer";
import AdminUsersContainer from "./containers/AdminUsersContainer";
import OrderContainer from "./containers/OrderContainer";
import LoginContainer from "./containers/LoginContainer";
import CartContainer from "./containers/CartContainer";
import ProductDetailContainer from "./containers/ProductDetailContainer";
import ProfileContainer from "./containers/ProfileContainer";
import ProductListContainer from "./containers/ProductListContainer";
import RegisterContainer from "./containers/RegisterContainer";
const App = ({ user }) => (
  <Router>
    <Switch>
      <Route
        path="/"
        exact
        component={ProductListContainer}
        layout={DefaultLayout}
      />
      <Route path="/cart" component={CartContainer} layout={DefaultLayout} />
      <Route
        path="/products/:productId"
        component={ProductDetailContainer}
        layout={DefaultLayout}
      />
      <Route path="/order" component={OrderContainer} layout={DefaultLayout} />
      <Route
        path="/user/login"
        component={LoginContainer}
        layout={DefaultLayout}
      />
      <Route
        path="/user/register"
        component={RegisterContainer}
        layout={DefaultLayout}
      />
      <Route
        path="/user/profile"
        component={ProfileContainer}
        layout={DefaultLayout}
        authenticate="user"
        user={user}
      />
      <Route
        path="/admin/products"
        layout={AdminLayout}
        component={AdminProductsContainer}
        authenticate="admin"
        user={user}
      />
      <Route
        path="/admin/users"
        layout={AdminLayout}
        component={AdminUsersContainer}
        authenticate="admin"
        user={user}
      />
      <Route
        path="/admin/orders"
        layout={AdminLayout}
        component={AdminOrdersContainer}
        authenticate="admin"
        user={user}
      />
      <Route component={NotFound} layout={DefaultLayout} />
    </Switch>
  </Router>
);
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(App);
