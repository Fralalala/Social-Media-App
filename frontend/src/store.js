import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducers"
import { searchReducer } from "./reducers/searchReducer"

const reducer = combineReducers({
  userReducer,
  postReducer,
  searchReducer
});

const initialState = {};

const middlware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
