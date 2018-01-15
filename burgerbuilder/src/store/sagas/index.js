import { takeEvery,all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as authSagas from './auth';
import * as burgerBuilderSaga from './burgerBuilder';
import * as orderSagas from './order';

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.DO_LOGOUT , authSagas.logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT , authSagas.checkTimeOutToLogoutSaga),
        takeEvery(actionTypes.DO_LOGIN,authSagas.doAuthenticateSaga),
        takeEvery(actionTypes.DO_CHECK_AUTH,authSagas.isUserAuthenticated)
    ]); 
}

export function* watchBurgerBuild(){
    yield takeEvery(actionTypes.DO_DOWNLOAD_INGREDIENTS,burgerBuilderSaga.downloadIngredients);
}

export function* watchOrder(){
    yield takeEvery(actionTypes.DO_PURCHASE_ORDER,orderSagas.doPurchase);
    yield takeEvery(actionTypes.DO_DOWNLOAD_ORDERS,orderSagas.downloadOrders);
}