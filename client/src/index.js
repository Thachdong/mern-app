import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import "./index.scss";
import store from "./redux/store";
import App from "./App";
import alertConfig from './reactAlertConfig';

render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertConfig}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
