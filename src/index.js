import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import HomeComponent from "./components/home";

function myreducer(state = { count: 0 }, action) {
  const count = state.count;
  switch (action.type) {
    case "increase":
      return { count: count + 1 };
    default:
      return state;
  }
}
const store = createStore(myreducer);
// how to add a middleware,不同的middleware可以compose起来
// const logger = ({ getState }) => {
//   return next => action => {
//     console.log('will dispatch', action)
//     // Call the next dispatch method in the middleware chain.
//     const returnValue = next(action)
//     console.log('state after dispatch', getState())
//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue
//   }
// }

// how to compose middleware
// let middleware = [a, b]
// if (process.env.NODE_ENV !== 'production') {
//   const c = require('some-debug-middleware')
//   const d = require('another-debug-middleware')
//   middleware = [...middleware, c, d]
// }
//createStore(todos, ['Use Redux'], applyMiddleware(...middleware))
//createStore(todos, ['Use Redux'], applyMiddleware(logger))

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  };
}
// Map Redux actions to component props
const increaseAction = { type: "increase" };
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

//  ReactDOM.render(<HomeComponent />, document.getElementById('app'));
