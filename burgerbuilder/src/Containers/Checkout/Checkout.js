import React , {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients : {
            bacon:0,
            meat:1,
            cheese:2,
            salad:2
        }
    }

    checkoutCancelHandler = () => {
      this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/contact-data');
    }

    render(){
        return (
            <div>
                    <CheckoutSummary ingredients={this.state.ingredients}
                            cancel = {this.checkoutCancelHandler}
                            continue={this.checkoutContinueHandler}/>
            </div>
        );
    }
}

export default Checkout;