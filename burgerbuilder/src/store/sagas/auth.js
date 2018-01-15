import {delay} from 'redux-saga';
import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';




export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expiryDate');
    yield localStorage.removeItem('userid');

    yield put(actions.logoutSucess());
}

export function* checkTimeOutToLogoutSaga(action) {
    yield delay(action.timeout*1000);
    yield put(actions.logout());
}

export function* doAuthenticateSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email:action.email,
        password:action.password,
        returnSecureToken:true
    };
    
    const authUrl = action.isSignUp?"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyChOS6soSbA9uv4fWd_uaG5gfXOZEdVFHU":
                        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChOS6soSbA9uv4fWd_uaG5gfXOZEdVFHU";
    try{
        const response = yield axios.post(authUrl , authData);

                    
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('userid',response.data.localId);

        const expiryDate  = new Date((new Date()).getTime() + (response.data.expiresIn*1000)); 

        yield localStorage.setItem('expiryDate', expiryDate);

        yield put(actions.authSuccess(response.data.idToken ,response.data.localId));
        yield put(actions.checkTimeOutToLogout(response.data.expiresIn));
  
    }catch( error ) {
        console.log(error);
        yield put(actions.authFail(error.response.data.error.message));
     }; 
    
}

export function* isUserAuthenticated(action){
        const token = yield localStorage.getItem('token');
        if(!token){
           // dispatch(logout());
           yield put(actions.logout());
        }
        else{
            const userid = yield localStorage.getItem('userid');
            const expiryDate =yield  new Date(localStorage.getItem('expiryDate'));

            const today =yield  new Date();

            if(expiryDate <= today){
                yield  put(actions.logout());
            }
            else{
                
                yield put(actions.authSuccess(token,userid));

                const timeout = (expiryDate.getTime() - today.getTime())/1000;
                
                yield put(actions.checkTimeOutToLogout(timeout));

            }
        }
}
