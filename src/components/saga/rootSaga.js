import { put,call, take } from 'redux-saga/effects'
import {getLoginStatus}   from '../services/loginService'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* rootSaga() {
  try {
    console.log("i am in login saga")
    while(true){
      const action = yield take("MYLOGIN");
      console.log("i get the action of mylogin from view..."+action.data)
      const data  = yield call(getLoginStatus,"/url/url",{
        "data":action.data
      });
     console.log("call return:"+JSON.stringify(data));
     yield put({
       type:'UPDATE_LOGIN',
       value:data.data
      });
      

    }
    
    
  } catch (err) {
    console.log("get error:"+err)
  }
}

// const makeRestartable = (saga) => {
//   return function* () {
//     yield spawn(function* () {
//       while (true) {
//         try {
//           yield call(saga);
//           console.error("unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!",saga);
//         } catch (e) {
//           console.error("Saga error, the saga will be restarted",e);
//         }
//         yield delay(1000); // Workaround to avoid infinite error loops
//       }
//     })
//   };
// };

// const rootSagasAll = [
//   loginSaga
// ].map(makeRestartable);

// export function* rootSaga() {
//   yield rootSagasAll.map(saga => call(saga));
// }