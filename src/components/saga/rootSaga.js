import { put,call } from 'redux-saga/effects'
import LoginService  from '../services/loginService'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* loginSaga(action) {
  try {
    const data = yield call(LoginService.getLoginStatus,action.payload)
    yield put({ type: 'LOGIN' }, data);
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}

const makeRestartable = (saga) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error("unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!",saga);
        } catch (e) {
          console.error("Saga error, the saga will be restarted",e);
        }
        yield delay(1000); // Workaround to avoid infinite error loops
      }
    })
  };
};

const rootSagasAll = [
  loginSaga
].map(makeRestartable);

export default function* rootSaga() {
  yield rootSagasAll.map(saga => call(saga));
}