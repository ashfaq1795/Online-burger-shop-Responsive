import React, {Component} from 'react';
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
<<<<<<< HEAD
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

=======
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
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
            this.props.onSetAuthRedirectPath('/checkout');
        }
=======
        this.setState({purchasing: true});
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler=()=>{
<<<<<<< HEAD
        this.props.onInitPurchase();
=======
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
        let burger= this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
=======
        let burger= this.state.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
                        isAuth= {this.props.isAuthenticated}
=======
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
        // if(this.state.loading){
        //     orderSummary= <Spinner />
        // }
=======
        if(this.state.loading){
            orderSummary= <Spinner />
        }
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
        return(
            <Aux> 
                <Modal show={this.state.purchasing}
                 modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        )
<<<<<<< HEAD
    };
};

const mapStateToProps= state=>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
=======
    }
}

const mapStateToProps= state=>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    }
}

const mapDispatchToProps= dispatch =>{
    return {
<<<<<<< HEAD
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))
=======
        onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));