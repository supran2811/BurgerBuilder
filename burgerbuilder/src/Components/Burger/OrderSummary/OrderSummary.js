import Button from '../../UI/Button/Button';
import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map( igKey => {
        return <li key={igKey}> 
                    <span style={{textTransform:'capitalize'}}>
                        {igKey}
                    </span> : {props.ingredients[igKey]}  
                </li>
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p> Your delicous burger is ready for purchase</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price is {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType = "Danger" clicked={props.cancelPurchase}>CANCEL</Button>
            <Button btnType = "Success" clicked={props.continuePurchase}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;