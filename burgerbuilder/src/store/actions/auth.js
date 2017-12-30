import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => (
    {
        type:actionTypes.AUTH_START
    }
);

export const authSuccess = (token,userid) => (
    {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userid:userid
    }
)

export const authFail = (error) => (
    {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
);

export const signIn = (email,password) => {
    return dispatch => {
        dispatch(auth(email,password,false));
    }
}

export const signUp = (email,password) => {
    return dispatch => {
        dispatch(auth(email,password,true));
    }
}

export const logout = () => (
    {
        type:actionTypes.LOGOUT
    }
);

export const checkTimeOutToLogout = timeout => (
    dispatch => {
        setTimeout(() => {
            dispatch(logout());
        } , timeout*1000);
    }
);

const auth = (email,password,isSignUp) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        
        const authUrl = isSignUp?"https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyChOS6soSbA9uv4fWd_uaG5gfXOZEdVFHU":
                            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyChOS6soSbA9uv4fWd_uaG5gfXOZEdVFHU";

        axios.post(authUrl , authData)
                .then(response => {
                    console.log(response.data);
                    dispatch(authSuccess(response.data.idToken ,response.data.localId));
                    dispatch(checkTimeOutToLogout(response.data.expiresIn));
                })
                .catch(error => {
                    console.log(error);
                    dispatch(authFail(error.response.data.error.message));
                });                    

    }
}