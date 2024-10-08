import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";

import authReducer from "../reducers/auth";
import followingsReducer from "../reducers/followings";
import assetsReducer from "../reducers/assets";
import headlinesReducer from "../reducers/headlines";

let composeEnhancers;
try {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} catch {
  composeEnhancers = compose;
}

const combinedReducer = combineReducers({
  auth: authReducer,
  followings: followingsReducer,
  assets: assetsReducer,
  headlines: headlinesReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = (context) =>
  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });
