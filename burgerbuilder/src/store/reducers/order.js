import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders : [],
    loading:false,
    isPurchased:false
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_SUCESS:{
            
            return {
                ...state,
                orders : state.orders.concat({...action.orderData,id:action.id}),
                loading:false,
                isPurchased : true
            }
        }
        case actionTypes.SET_ORDERS:{

            return {
                ...state,
                orders : action.orders,
                loading:false
            }
        }
        case actionTypes.FETCH_ORDER_INIT:{
            return {
                ...state,
                loading:true
            }
        }
        case actionTypes.PURCHASE_FAIL:{
            return {
               ...state,
               loading:false
            }
        }
        case actionTypes.PURCHASE_START:{
            return {
                ...state,
                loading:true
            }
        }
        case actionTypes.PURCHASE_INIT:{
            return {
                ...state,
                isPurchased:false
            }
        }
        default :
            return state;
    }
}

export default reducer;