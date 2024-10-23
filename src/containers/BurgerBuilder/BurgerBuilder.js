import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions  from '../../store/actions/index';
import axios from '../../axios-orders';

//As this component is connected to redux while we test those component which are not connected to redux. because we don't test that either component is connected to redux store or not. we relay that component is connected correctly.
//so we export BurgerBuilder component namely as well as default export.
//then we can test BurgerBuilder and make shallow render of BurgerBuilder.
export class BurgerBuilder extends Component{
    state ={
        purchasing: false,
    };
    componentDidMount(){
        this.props.onInitIngredients();
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
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
            this.props.onSetAuthRedirectPath('/checkout');
        }
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
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
        let burger= this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
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
                        isAuth= {this.props.isAuthenticated}
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
        // if(this.state.loading){
        //     orderSummary= <Spinner />
        // }
        return(
            <Aux> 
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        )
    };
};

const mapStateToProps= state=>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));