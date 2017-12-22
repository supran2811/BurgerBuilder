import React , {Component} from 'react';
import { connect } from 'react-redux';


import * as actionTypes from '../../store/actions';


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
         return (sum > 0);
    }    
    
    setIsPurchasingHandler = () => {
        this.setState({isPurchasing:true});
    }

    setCancelIsPurchasingHandler = () => {
        this.setState({isPurchasing:false});
    }

    setPurchaseContinueHandler = () => {

       

        // let queryParams = [];
        // for(let i in this.props.ingredients){
        //     queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.price);
        // const queryString = queryParams.join('&');

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
        ingredients:state.ingredients,
        price:state.price
    }
);

const mapDispatchToProps = dispatch => (
    {
        onAddIngredients : (type,count) => dispatch({type:actionTypes.ADD_INGREDIENT , igKey:type , count:count}),
        onRemoveIngredient : (type) => dispatch({type:actionTypes.REMOVE_INGREDIENT,igKey:type})
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));