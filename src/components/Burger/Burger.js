import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igkey=>{ //this map function will return an array of undefined values having length of props.ingredients[igkey].
        return [...Array(props.ingredients[igkey])]
        .map((_,i)=>{ //each element of array will be an array of   <BurgerIngredient/> of length props.ingredient[igkey]  with different props.
           return <BurgerIngredient key={igkey+i} type={igkey} />
        })
    }).reduce((preValue,currentValue)=>{
        return preValue.concat(currentValue);
    },[]);  //reduce()=flat()
    
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please Start adding Ingredient!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )

}
export default burger;