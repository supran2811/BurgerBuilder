import React , {Component} from 'react';

import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 4,
    cheese: 10,
    meat:40,
    bacon : 20
};

class BurgerBuilder extends Component{

    state = {
        
                ingredients:{
                    salad:0,
                    cheese:0,
                    meat:0,
                    bacon:0
                },
                price:4,
                isPurchasable:false,
                isPurchasing:false
            }

    updateIsPurchasable(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((total,el) => {
                return total+el;    
            },0);

        this.setState({isPurchasable:sum > 0});      
    }    
    
    setIsPurchasingHandler = () => {
        this.setState({isPurchasing:true});
    }

    setCancelIsPurchasingHandler = () => {
        this.setState({isPurchasing:false});
    }

    setPurchaseContinueHandler = () => {
        alert("Continue to order!!");
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updateCount = oldIngredientCount+1;
        const oldPrice = this.state.price;
        const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updateCount;
        console.log(updatedIngredients);
        this.setState({price:updatedPrice , ingredients:updatedIngredients});
        this.updateIsPurchasable(updatedIngredients);

    }   
    
    removeIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if(oldIngredientCount > 0){
            const updateCount = oldIngredientCount-1;
            const oldPrice = this.state.price;
            const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updateCount;
            this.setState({price:updatedPrice , ingredients:updatedIngredients});
            this.updateIsPurchasable(updatedIngredients);
        }
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
        <Aux>
            <Modal show={this.state.isPurchasing} modalClosed={this.setCancelIsPurchasingHandler}>
                <OrderSummary ingredients = {this.state.ingredients}
                                price = {this.state.price}
                                cancelPurchase = {this.setCancelIsPurchasingHandler}
                                continuePurchase = {this.setPurchaseContinueHandler}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler} 
                            disableRemove = {disabledInfo}
                            price = {this.state.price}
                            isPurchasable = {this.state.isPurchasable}
                            order = {this.setIsPurchasingHandler}/>
        </Aux>
        );
    }
}

export default BurgerBuilder;