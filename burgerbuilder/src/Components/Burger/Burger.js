import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

    let transformedBurger = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map( (_,index) =>{
            return <BurgerIngredient key = {ingKey+index} type={ingKey} />  
        } )
    }).reduce((arr,el) => {
           return arr.concat(el);
    } , []);
    if(transformedBurger.length === 0){
        transformedBurger = <p>Please add new ingredients</p>
    }

    return (
        <div className = {classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {transformedBurger}
                <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;