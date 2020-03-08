import React from "react";
import ReactDOM from "react-dom";

import { createStore,applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import logger from "redux-logger"

import HomeComponent from "./components/home";
import myreducer from "./components/reducer/myreducer"
import increaseAction from "./components/actions/increaseAction"
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [logger]
const composeEnhancers = composeWithDevTools(
    applyMiddleware(...middleware)
);
const store = createStore(myreducer,composeEnhancers);
// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  };
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
