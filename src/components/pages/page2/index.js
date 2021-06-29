import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import HomeComponent from "./home";
import store from "../../store/store"


// Map Redux state to component props
function mapStateToProps(state) {
  return {
    count: state.counter.count
  };
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch({
      type: "MYLOGIN_MINUS" ,
      data: 100
    })
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
