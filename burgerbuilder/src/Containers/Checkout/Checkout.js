import React , {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
 

    checkoutCancelHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.path +'/contact-data');
    }

    render(){
        return (
            <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                            cancel = {this.checkoutCancelHandler}
                            continue={this.checkoutContinueHandler}/>
                    
                    <Route path={this.props.match.path + "/contact-data"} 
                                  component = {ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        ingredients:state.ingredients,
        price:state.price
    }
);



export default connect(mapStateToProps)(Checkout);