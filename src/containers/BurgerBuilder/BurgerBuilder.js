import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component{
    state ={
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        console.log(this.props.ings)
        // axios.get('https://react-my-burger-27fb2-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
    }
    ingredientButtonHandler=(ingredients)=>{
        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        }).reduce((preVal,currentVal)=>{
                return preVal + currentVal;
            },0);
        return sum > 0;
    }
    purchasingHandler=()=>{
        this.setState({purchasing: true});
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler=()=>{
        this.props.history.push('/checkout');
    }

    render(){
        let disabledControl={
            ...this.props.ings
        }
        for(let key in disabledControl){
            disabledControl[key]=disabledControl[key]<=0;
        }

        //As orderSummary and Burger component uses ingrident state so before fetching ingredient from server I display spinner in burger and make orderSummary to null. otherwise it give me error.
        let orderSummary=null;
        let burger= this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledControl}
                        price={this.props.price}
                        purchasable={this.ingredientButtonHandler(this.props.ings)}
                        ordered={this.purchasingHandler}
                    />  
                </Aux>       
            )
            orderSummary= <OrderSummary 
                ingredients={this.props.ings} 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            /> 
            
        }
        if(this.state.loading){
            orderSummary= <Spinner />
        }
        return(
            <Aux> 
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps= state=>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));