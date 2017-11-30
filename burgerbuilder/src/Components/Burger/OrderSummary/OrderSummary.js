import React , { Component } from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends Component {

     render(){

        const ingredientSummary = Object.keys(this.props.ingredients).map( igKey => {
            return <li key={igKey}> 
                        <span style={{textTransform:'capitalize'}}>
                            {igKey}
                        </span> : {this.props.ingredients[igKey]}  
                    </li>
        })
    

        return (
            <Aux>
                <h3>Your Order</h3>
                <p> Your delicous burger is ready for purchase</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price is {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType = "Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType = "Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;