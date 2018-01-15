import * as actionTypes from './actionTypes';


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

export const logout = () => {
    return {
        type:actionTypes.DO_LOGOUT
    }
};

export const logoutSucess = () => ({
    type:actionTypes.LOGOUT
});

export const checkTimeOutToLogout = timeout => (
    {
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        timeout:timeout
    }
);

const auth = (email,password,isSignUp) => (
    {
        type:actionTypes.DO_LOGIN,
        email:email,
        password:password,
        isSignUp : isSignUp
    }
);

export const isUserAuthenticated = () => (
    {
        type:actionTypes.DO_CHECK_AUTH
    }
);