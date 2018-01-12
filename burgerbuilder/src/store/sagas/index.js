import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';

export function* watchAuth(){
    yield takeEvery(actionTypes.DO_LOGOUT , authSagas.logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT , authSagas.checkTimeOutToLogoutSaga);
    yield takeEvery(actionTypes.DO_LOGIN,authSagas.doAuthenticateSaga);
}