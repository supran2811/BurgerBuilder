import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState = {
    orders : [],
    loading:false,
    isPurchased:false
}

const purchaseSucess = (state,action) => {
    return updateObject(state,{
        orders : state.orders.concat({...action.orderData,id:action.id}),
                loading:false,
                isPurchased : true
    });
}

const setOrders = (state,action) => {
    return updateObject(state,{
        orders : action.orders,
        loading:false
    });
}
const purchaseFail = (state,action) => {
    return updateObject(state,{loading:false});
}

const startLoading = (state,action) => {
    return updateObject(state,{
        loading:true
    });
}

const purchaseInit = (state,action) => {
    return updateObject(state,{isPurchased:false});
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_SUCESS:return purchaseSucess(state,action);
        
        case actionTypes.SET_ORDERS:return setOrders(state,action);
        
        case actionTypes.PURCHASE_FAIL:return purchaseFail(state,action);
        
        case actionTypes.FETCH_ORDER_INIT:
        case actionTypes.PURCHASE_START:return startLoading(state,action);

        case actionTypes.PURCHASE_INIT:return purchaseInit(state,action);
        
        default :
            return state;
    }
}

export default reducer;