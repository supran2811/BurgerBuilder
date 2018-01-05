import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    token:null,
    userid:null,
    error:null,
    loading:false
};

const authStart = (state,action) => (
    updateObject(state,{loading:true})
);

const authSucess = (state,action) => (
    updateObject(state,{token:action.token , userid:action.userid , error:null, loading:false})
);

const authFail = (state,action) => (
    updateObject(state,{error:action.error,loading:false})
);

const logout = (state,action) => (
    updateObject(state,{token:null , userid:null})
);
const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.AUTH_START:return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSucess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.LOGOUT: return logout(state,action);
        default:return state ;   
    }
}

export default reducer;