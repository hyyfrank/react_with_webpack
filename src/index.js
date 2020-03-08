import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import HomeComponent from "./components/home";
import store from "./components/store/store"
import increaseAction from "./components/actions/increaseAction"


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
