import React , {Component} from 'react';
import { connect } from 'react-redux';


import * as actions from '../../store/actions/index';


import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component{

    state = {
                isPurchasing:false,
                loading:false
            }


    componentDidMount() {
       this.props.downloadIngredients();
    }        
    

    updateIsPurchasable(ingredients){
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((total,el) => {
                return total+el;    
            },0);
         return (sum > 0);
    }    
    
    setIsPurchasingHandler = () => {
        
        this.setState({isPurchasing:true});
    }

    setCancelIsPurchasingHandler = () => {
        this.setState({isPurchasing:false});
    }

    setPurchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push({pathname:'/checkout'} );
        
    }

    addIngredientHandler = (type,count=1) => {
        this.props.onAddIngredients(type,count);   
    }   
    
    removeIngredientHandler = (type) => {
        this.props.onRemoveIngredient(type);
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = <Spinner />
        let orderSummary = null;
    
       
        if(this.props.ingredients){
        burger =  <Aux><Burger ingredients={this.props.ingredients}/>
                    <BuildControls ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler} 
                        disableRemove = {disabledInfo}
                        price = {this.props.price}
                        isPurchasable = {this.updateIsPurchasable(this.props.ingredients)}
                        order = {this.setIsPurchasingHandler}/></Aux>;
       
                orderSummary = <OrderSummary ingredients = {this.props.ingredients}
                price = {this.props.price}
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

const mapStateToProps = state => (
    {
        ingredients:state.burger.ingredients,
        price:state.burger.price
    }
);

const mapDispatchToProps = dispatch => (
    {
        onAddIngredients : (type,count) => dispatch(actions.addIngredient(type,count)),
        onRemoveIngredient : (type) => dispatch(actions.deleteIngredient(type)),
        downloadIngredients : () => dispatch(actions.downloadIngredients()),
        initPurchase : () => dispatch(actions.purchaseInit())
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));