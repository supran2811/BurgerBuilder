import {put,select} from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-order';

export function* doPurchase(action){
        yield put(actions.purchaseStart());
        const state = yield select();
        const token = state.auth.token;
        
        try{   
                const response = yield axios.post("orders.json?auth="+token,action.order)
                yield put(actions.purchaseSucess(response.data.name,action.order));
        }catch(error){
                console.log("[OrderSaga]",error);
                yield put(actions.purchaseFail());
        }
        
}

export function* downloadOrders(action){
        yield put(actions.initDownloadOrders());
        const state = yield select();
        const queryParams = "auth="+state.auth.token+'&orderBy="userid"&equalTo="'+state.auth.userid+'"';
        try{
                const response = yield axios.get('orders.json?'+queryParams )
                if(response != null){
                        let orders  = []; 

                        for(let key in response.data){
                                orders.push({
                                ...response.data[key],
                                id:key
                                });
                        }
                        yield put(actions.setOrders(orders));
                }
        }catch(error){
                console.log(error);
        }
           
      
}