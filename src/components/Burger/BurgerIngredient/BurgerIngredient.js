import React, {Component} from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component{
    render(){
        let ingredient=null;

    switch(this.props.type){
        case ('bread-bottom'):
            ingredient= <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient=(
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break;
        case ('meat'):
            ingredient= <div className={classes.Meat}></div>
            break;
        case ('cheese'):
            ingredient= <div className={classes.Cheese}></div>
            break;
        case ('bacon'):
            ingredient= <div className={classes.Bacon}></div>
            break;
        case ('salad'):
            ingredient= <div className={classes.Salad}></div>
            break;
        default:
            ingredient = null;
    }

    return ingredient;
    }
};
//BurgerIngredient.propTypes is an object that defines the prop types for the BurgerIngredient component.
//PropTypes: PropTypes is an object imported from the prop-types library in React. It provides a set of validators to check the type and value of props. 
//PropTypes.string specifies that the type prop should be a string.
//isRequired: It is a modifier that specifies that the type prop is required, meaning it must be provided when using the BurgerIngredient component. If the type prop is not provided, a warning will be shown in the developer console.

BurgerIngredient.propTypes={
    type: PropTypes.string.isRequired
};
export default BurgerIngredient;