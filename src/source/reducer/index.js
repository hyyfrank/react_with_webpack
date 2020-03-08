import {combineReducers} from 'redux'
function counter(state = { count: 0 }, action) {
    const count = state.count;
    switch (action.type) {
      case "LOGIN":
        return { count: action.payload };
      case "UPDATE_LOGIN":
        return {count: action.value}  
      default:
        return state;
    }
}

const index = combineReducers({
    counter
})
export default index;