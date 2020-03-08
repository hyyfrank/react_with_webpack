import {applyMiddleware, createStore} from 'redux';
import CustomerMiddle from "../middlewares/customer";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from "redux-devtools-extension";
import myReducer from "../reducer/index";
import { helloSaga } from '../saga/helloSaga'

const sagaMiddleware = createSagaMiddleware()


function store() {
    const middleware = [sagaMiddleware,CustomerMiddle,logger]
    const composeEnhancers = composeWithDevTools(
        applyMiddleware(...middleware)
    );
    const store = createStore(myReducer,composeEnhancers);
    sagaMiddleware.run(helloSaga)
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