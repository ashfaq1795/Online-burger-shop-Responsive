import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state,action) =>{
    return updateObject(state,{purchased: false}); 
};
const purchaseBurgerStart = (state,action) =>{
    return updateObject(state,{loading: true});
};
const purchaseBurgerSuccess = (state,action) =>{
    const newOrder = updateObject(action.orderData,{id: action.orderId});
    return updateObject(state,{
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder) //here we store orders for no reason we can omit it.
    });
};
const purchaseBurgerFailed = (state,action) => {
    //in case of error we still return state and loading to false and error we handle through withErrorHandle by which we wrapped our ContactData component.
    return updateObject(state,{loading: false});
};
const fetchedOrdersStart = (state,action) =>{
    return updateObject(state,{loading: true});
};
const fetchedOrdersSuccess =(state,action) => {
    return updateObject(state,{
        orders: action.orders,
        loading: false 
    });
};
const fetchedOrdersFailed = (state,action) =>{
    return updateObject(state,{loading: false});
};



const reducer =(state=initialState,action) =>{
     switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state,action); //it dispatches before the order store in firebase.
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action); 
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state,action);
        case actionTypes.FETCH_ORDERS_START: return fetchedOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchedOrdersSuccess(state,action);  
        case actionTypes.FETCH_ORDERS_FAILED: return fetchedOrdersFailed(state,action);
        default: return state;
     };
};
export default reducer;