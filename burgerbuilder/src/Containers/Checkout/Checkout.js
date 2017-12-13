import React , {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends Component {
    state = {
        ingredients : null,
        price:0
    }

    componentWillMount(){
       
        const params = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of params.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }
            else
                 ingredients[param[0]] = +param[1]; 
        }
      
        
        this.setState({ingredients:ingredients , price:price});
    }

    checkoutCancelHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.path +'/contact-data');
    }

    render(){
        return (
            <div>
                    <CheckoutSummary ingredients={this.state.ingredients}
                            cancel = {this.checkoutCancelHandler}
                            continue={this.checkoutContinueHandler}/>
                    
                    <Route path={this.props.match.path + "/contact-data"} 
                            render = {(props) => (<ContactData  ingredients={this.state.ingredients}  
                                                price={this.state.price} 
                                                {...props}/>) } />
            </div>
        );
    }
}

export default Checkout;