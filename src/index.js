import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import HomeComponent from "./components/home";
import myreducer from "./components/reducer/myreducer"
import increaseAction from "./components/actions/increaseAction"

const store = createStore(myreducer);
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
