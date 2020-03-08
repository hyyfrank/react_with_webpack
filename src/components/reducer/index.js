import {combineReducers} from 'redux'
function counter(state = { count: 0 }, action) {
    const count = state.count;
    switch (action.type) {
      case "increase":
        return { count: count + 1 };
      default:
        return state;
    }
}
function list(state = { listcount: 0 }, action) {
    const listcount = state.listcount;
    switch (action.type) {
        case "decrease":
            return { listcount: listcount - 1 };
        default:
            return state;
    }
}
const index = combineReducers({
    list,
    counter
})
export default index;