import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from  '../../store/actions/index';

class Checkout extends Component {
 

    checkoutCancelHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.path +'/contact-data');
    }

    render(){
        if(this.props.isPurchased){
            this.props.resetBurger();
        }
        let summary = this.props.ingredients && !this.props.isPurchased ?(
                    <div>
                        <CheckoutSummary ingredients={this.props.ingredients}
                                        cancel = {this.checkoutCancelHandler}
                                        continue={this.checkoutContinueHandler}/>
                        
                        <Route path={this.props.match.path + "/contact-data"} 
                                    component = {ContactData} />
                    </div>
        ):<Redirect to="/" />;
        
        return summary;
    }
}

const mapStateToProps = state => (
    {
        ingredients:state.burger.ingredients,
        price:state.burger.price,
        isPurchased: state.order.isPurchased
    }
);

const mapDispatchToProps = dispatch => (
    {
        resetBurger:() => dispatch(actions.resetBurgerState())
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);