import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseSucess = (id,orderData) => (
    {
        type:actionTypes.PURCHASE_SUCESS,
        id:id,
        orderData:orderData
    }
);

export const purchaseFail = () => (
    {
        type:actionTypes.PURCHASE_FAIL
    }
);

export const purchaseStart = () => (
    {
        type:actionTypes.PURCHASE_START
    }
);

export const purchaseInit = () => (
    {
        type:actionTypes.PURCHASE_INIT
    }
);

export const purchase = (order) => (
    (dispatch,getState) => {
        
        dispatch(purchaseStart());

        axios.post("orders.json?auth="+getState().auth.token,order).then(response => {
            console.log("[OrdersAction]",response.data);
            dispatch(purchaseSucess(response.data.name,order));
         })
         .catch(errr => {
             console.log(errr);
             dispatch(purchaseFail());
         })
    }
);

export const setOrders = (orders) => (
    {
        type:actionTypes.SET_ORDERS,
        orders : orders
    }
);

export const initDownloadOrders = () => (
    {
        type:actionTypes.FETCH_ORDER_INIT
    }
);

export const downloadOrders = () => (
    (dispatch,getState) => {
        dispatch(initDownloadOrders());
        console.log("State ",);
        axios.get('orders.json?auth='+getState().auth.token ).then(response =>{
            if(response != null){
               let orders  = []; 
               console.log(response.data);
               for(let key in response.data){
                   orders.push({
                       ...response.data[key],
                       id:key
                   });
               }
               dispatch(setOrders(orders));
            }
       }).catch(error => {
           console.log(error);
       })
    }
);