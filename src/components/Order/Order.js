import React from 'react';
import classes from './Order.module.css';
const order = (props) =>{
    let ingredients=[];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    };

    let ingredientsOutput=ingredients.map(ingredient =>{
        return <span 
                    key={ingredient.name}
                    style={{display: 'inline-block',
                    border: '1px solid #ccc',
                    textTransform: 'capitalize',
                    padding: '5px',
                    margin: '0px 8px'}}>
                    {ingredient.name} ({ingredient.amount}) 
               </span>
    })
    return (
        <div className={classes.Order}>
            <p> Ingredients: {ingredientsOutput} </p>
            <p> Price: <strong> USD {props.price}</strong></p>
        </div>
    )
}
export default order;