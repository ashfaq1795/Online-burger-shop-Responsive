import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/Utility';

const initialState={
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//we can set logic of reducer here to make reducer's switch cases linear.
const addIngredients = (state, action)=>{
     //here we linear the reducer using updateObject() method.
     const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
     //[action.ingredientName] this is the special syntax provided by ES6 accessing property name. (dynamic name selector).
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state,updatedState); 
}
const setIngredients = (state,action) =>{
    return updateObject(state,{
        ingredients: { 
            //this is done just for order changing. By default it's following order of firebase ingredient. we can also change order in firebase too.
            //we can also do ingredients: action.ingredients
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};
const fetchIngredientFailed = (state,action) =>{
    //in case of error we still have to return state.
    return updateObject(state,{error: true});
}
const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state,action);    
        case actionTypes.REMOVE_INGREDIENT:
            //logic happening in ADD_INGREDIENT is same as in here. but I have lineared ADD_INGREDIENT. I can also do it here but I leave it for understanding.
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
        };
        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);  
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state,action);
        default: return state;
    }

}
export default reducer;