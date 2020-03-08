import {applyMiddleware, createStore} from 'redux';
import CustomerMiddle from "../middlewares/customer";
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import myReducer from "../reducer/index";

function store() {
    const middleware = [CustomerMiddle,logger]
    const composeEnhancers = composeWithDevTools(
        applyMiddleware(...middleware)
    );
    const store = createStore(myReducer,composeEnhancers);
    if(module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducer/index', () => {
            const nextReducer = require('../reducer/index').default;
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}
export default store()