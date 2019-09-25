
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import HomeComponent from './components/home'

function myreducer(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
      case 'increase':
        return { count: count + 1 }
      default:
        return state
    }
  }
const increaseAction = { type: 'increase' }
const store = createStore(myreducer)
// Map Redux state to component props
function mapStateToProps(state) {
    return {
      value: state.count
    }
  }
  
  // Map Redux actions to component props
  function mapDispatchToProps(dispatch) {
    return {
      onIncreaseClick: () => dispatch(increaseAction)
    }
  }

const App = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeComponent)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('app')
)

//  ReactDOM.render(<HomeComponent />, document.getElementById('app'));
