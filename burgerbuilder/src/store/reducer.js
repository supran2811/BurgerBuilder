import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad : 4,
    cheese: 10,
    meat:40,
    bacon : 20
};

const initialState = {
    ingredients:{
        bacon:0,
        meat:0,
        cheese:0,
        salad:0
    },
    price:4
}

const reducer = (state=initialState , action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            if(action.count >= 1){
                const oldIngredientCount = state.ingredients[action.igKey];
                const updateCount = oldIngredientCount+action.count;
                const oldPrice = state.price;
                const updatedPrice = oldPrice + (action.count*INGREDIENT_PRICES[action.igKey]);
                const updatedIngredients = {...state.ingredients}
                updatedIngredients[action.igKey] = updateCount;

                return {
                    ...state,
                    ingredients:updatedIngredients,
                    price:updatedPrice
                }
            }
            return state;

        case actionTypes.REMOVE_INGREDIENT:
            const oldIngredientCount = state.ingredients[action.igKey];
            if(oldIngredientCount > 0){
                const updateCount = oldIngredientCount-1;
                const oldPrice = state.price;
                const updatedPrice = oldPrice - INGREDIENT_PRICES[action.igKey];
                const updatedIngredients = {...state.ingredients};
                updatedIngredients[action.igKey] = updateCount;
                return {
                    ...state,
                    ingredients:updatedIngredients,
                    price:updatedPrice
                }
            }
            return state;


        default:
            return state;
    }
}

export default reducer;