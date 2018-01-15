import { put } from 'redux-saga/effects';
import axios from '../../axios-order';
import * as actions from '../actions';

export function* downloadIngredients(action){
    yield put(actions.resetBurgerState());
    try{
        const response = yield axios.get("ingredients.json")
        if(response.data != null){
            let igKeys = Object.keys(response.data);
            for(const igKey of igKeys){
                yield put(actions.addIngredient(igKey,response.data[igKey]));  
            }
        }
    } catch(error){
        console.log("[BurgerBuilderSaga]",error);
    }        
}