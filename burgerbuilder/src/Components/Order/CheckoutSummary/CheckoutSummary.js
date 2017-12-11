import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => (
    <div className = {classes.CheckoutSummary}>
    <h2>Hope you like your burger!!</h2>
        <div style={{width:'100%' ,height:'300px', margin:"auto"}}>
                <Burger ingredients = {props.ingredients}/>
        </div>  
        <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>  
        <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>  
    </div>
);

export default checkoutSummary;