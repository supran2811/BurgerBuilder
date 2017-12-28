import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
export const addIngredient = (type,count) => {
        console.log("addIngredient" , type,count);
    return {
            type:actionTypes.ADD_INGREDIENT 
            , igKey:type , 
            count:count
        }
}

export const deleteIngredient = (type) => {
    return {
                type:actionTypes.REMOVE_INGREDIENT,
                igKey:type
        }
}

export const resetBurgerState = () => {
        return {
                type:actionTypes.RESET_BURGER_STATE
        }
}

export const downloadIngredients = () => (

        dispatch => {
                axios.get("ingredients.json").then(response =>{
                        if(response.data != null){
                            let igKeys = Object.keys(response.data);
                            console.log(response.data);
                            for(const igKey of igKeys){
                                dispatch(addIngredient(igKey,response.data[igKey]));  
                            }
                        }            
                    })
                    .catch(errr => {
            
                    })    
        }
)