import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

//it's not a state or property it's just a constant.
const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];
const buildControls=(props)=>(
    <div className={classes.BuildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)}$</strong></p>
        {controls.map(cntrl=>(
            <BuildControl 
            key={cntrl.label} 
            label={cntrl.label} 
            added={()=>props.ingredientAdded(cntrl.type)}
            Removed={()=>props.ingredientRemoved(cntrl.type)}
            disabled={props.disabled[cntrl.type]}
            />
        ))}
<<<<<<< HEAD
        <button disabled={!props.purchasable}  className={classes.OrderButton} onClick={props.ordered}>{props.isAuth ? "ORDER NOW" : "SINGUP TO ORDER"}</button>
=======
        <button disabled={!props.purchasable}  className={classes.OrderButton} onClick={props.ordered}>Order Now</button>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    </div>
)
export default buildControls;