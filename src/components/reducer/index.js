import {combineReducers} from 'redux'
function counter(state = { count: 0 }, action) {
    const count = state.count;
    switch (action.type) {
      case "LOGIN":
        return { count: count + 1 };
      default:
        return state;
    }
}

const index = combineReducers({
    counter
})
export default index;