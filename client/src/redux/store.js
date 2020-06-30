import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";
import { fetchProduct } from "./actions/productAction";
import { refreshUser } from "./actions/userAction";

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

store.dispatch(fetchProduct());
store.dispatch(refreshUser());

export default store;
