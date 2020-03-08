import { fork,all,put,call, take } from 'redux-saga/effects'
import {loginSaga} from './loginSaga';
import {loginSaga2} from './loginSaga2';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export default function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(loginSaga2)
    ]);
}