import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
    salad : 4,
    cheese: 10,
    meat:40,
    bacon : 20
};

const initialState = {
    ingredients:null,
    price:4,
    isPurchasing:false
}

const addIngredients = (state,action) => {
    const igKeyCount = (state.ingredients && state.ingredients[action.igKey]) || 0;

    const updatedIngredients = updateObject(state.ingredients , {[action.igKey]:igKeyCount+action.count})

    return updateObject(state,{
        ingredients:updatedIngredients,
        price : state.price+(action.count*INGREDIENT_PRICES[action.igKey])
    });
}

const removeIngredient = (state,action) => {
    const oldIngredientCount = state.ingredients[action.igKey];
    if(oldIngredientCount > 0){
        const updatedIngredients = updateObject(state.ingredients , {[action.igKey]:oldIngredientCount - 1})

        return updateObject(state,{
            ingredients:updatedIngredients,
            price : state.price - INGREDIENT_PRICES[action.igKey]
        });
    }
    return state;
}

const resetBurgerState = () => (
    {
        ingredients:null,
        price:4,
        isPurchasing:false
    }
)

const resetIsPurchasing = (state,action) => (
    updateObject(state,{isPurchasing:false})
);

const setIsPurchasing = (state,action) => (
    updateObject(state,{isPurchasing:true})
);

const reducer = (state=initialState , action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredients(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.RESET_BURGER_STATE: return resetBurgerState();
        case actionTypes.RESET_IS_PURCHASING:return resetIsPurchasing(state);
        case actionTypes.SET_PURCHASING:return setIsPurchasing(state);
        default:
            return state;
    }
}

export default reducer;