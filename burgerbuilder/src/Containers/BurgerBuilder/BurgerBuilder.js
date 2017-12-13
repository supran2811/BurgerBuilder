import React , {Component} from 'react';

import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 4,
    cheese: 10,
    meat:40,
    bacon : 20
};

class BurgerBuilder extends Component{

    state = {
        
                ingredients:{
                    bacon:0,
                    meat:0,
                    cheese:0,
                    salad:0
                },
                price:4,
                isPurchasable:false,
                isPurchasing:false,
                loading:false
            }


    componentDidMount() {
        axios.get("ingredients.json").then(response =>{
            //this.setState({ingredients:response.data});
            if(response.data != null){
                let igKeys = Object.keys(response.data);
                console.log(igKeys);
                for(const igKey of igKeys){
                       console.log("Ing keys ",igKey);
                      this.addIngredientHandler(igKey,response.data[igKey]);  
                }
              //  this.updateIsPurchasable(response.data);
            }
            else{

            }
            
        })
        .catch(errr => {

        })
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

       

        let queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.price);
        const queryString = queryParams.join('&');

        this.props.history.push({pathname:'/checkout' , search:"?"+queryString} );
        
        
    }

    addIngredientHandler = (type,count=1) => {
        console.log("Inside addIngredientHandler ",type, count);
        if(count >= 1){
        const oldIngredientCount = this.state.ingredients[type];
        const updateCount = oldIngredientCount+count;
        const oldPrice = this.state.price;
        const updatedPrice = oldPrice + (count*INGREDIENT_PRICES[type]);
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updateCount;
        console.log(updatedIngredients);
        this.setState({price:updatedPrice , ingredients:updatedIngredients});
        this.updateIsPurchasable(updatedIngredients);
        }
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

        let burger = <Spinner />
        let orderSummary = null;
        if(this.state.ingredients){

            burger =  <Aux><Burger ingredients={this.state.ingredients}/>
                      <BuildControls ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler} 
                            disableRemove = {disabledInfo}
                            price = {this.state.price}
                            isPurchasable = {this.state.isPurchasable}
                            order = {this.setIsPurchasingHandler}/></Aux>;

            orderSummary = <OrderSummary ingredients = {this.state.ingredients}
            price = {this.state.price}
            cancelPurchase = {this.setCancelIsPurchasingHandler}
            continuePurchase = {this.setPurchaseContinueHandler}/>;
        }

        if(this.state.loading)
        {
            orderSummary = <Spinner />
        }

        return (
        <Aux>
            <Modal showLoading = {this.state.loading} show={this.state.isPurchasing} modalClosed={this.setCancelIsPurchasingHandler}>
                {orderSummary}
            </Modal>
                {burger}
        </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);