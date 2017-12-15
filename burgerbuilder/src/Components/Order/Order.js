
import React from 'react';
import classes from './Order.css';

const order = (props) => {
    console.log(props.ingredients);
    const ingredients = props.ingredients? Object.keys(props.ingredients).map((igKey) =>{
        return <span 
                    key={igKey}
                    style = {{
                         display:'inline-block',
                         border:'1px solid #ccc',
                         boxShadow:'0 1px 2px #eee',
                         margin:'0px 10px',
                         padding:'5px',
                         textTransform:'capitalize'
                    }}> 
                      {igKey + "("+props.ingredients[igKey]+")"}
                    </span>
    }) : null;

    return (
    <div key={props.id} className = {classes.Order}>
          <p>Ingredients : {ingredients}</p>
          <p> Price : <strong>{props.price}</strong></p>
    </div>);
};

export default order;