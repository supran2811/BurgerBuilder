import BuildControl from './BuildControl/BuildControl';

import React from 'react';
import classes from './BuildControls.css'

const controls = [
    {label : 'Salad' , type:'salad'},
    {label : 'Meat' , type:'meat'},
    {label : 'Cheese' , type:'cheese'},
    {label : 'Bacon' , type:'bacon'}
]


const buildControls = (props) => (
    <div className = {classes.BuildControls}>
       <p>Current price is <strong> {props.price} </strong></p>
        {controls.map((ctrl) => {
            return <BuildControl key = {ctrl.label} 
                    label = {ctrl.label} 
                    added = {() => props.ingredientAdded(ctrl.type)}
                    removed = {() => props.ingredientRemoved(ctrl.type)}
                    disabled = {props.disableRemove[ctrl.type]}/>
        } )}
        <button 
             onClick = {props.order}
             disabled = {!props.isPurchasable} 
             className = {classes.OrderButton}>{ props.isAuthenticated? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
);

export default buildControls;