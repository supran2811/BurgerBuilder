import * as actionTypes from './actionTypes';


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
    {
        type:actionTypes.DO_PURCHASE_ORDER,
        order:order
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
    {
        type:actionTypes.DO_DOWNLOAD_ORDERS
    }
);