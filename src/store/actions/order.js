import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            //order.data.name is id of each order which we get from firebase
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        }).catch(error =>{
            dispatch(purchaseBurgerFailed(error));
        });
    };
};

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess =(orders)=>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart =()=>{
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchedOrders = (token,userId) =>{
    return dispatch=>{
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(response=>{
            const fetchedOrders=[]; //we format data here becuase in reducer we set only logical operations.
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            };
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err=>{
            dispatch(fetchOrdersFailed(err));
        })
    };
};