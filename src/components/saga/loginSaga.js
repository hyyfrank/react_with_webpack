
import { fork,all,put,call, take } from 'redux-saga/effects'
import {getLoginStatus}   from '../services/loginService'
export function* loginSaga() {
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