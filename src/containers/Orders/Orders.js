import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orderList=<Spinner />;
        if(!this.props.loading){
            orderList= this.props.orders.map(order =>(
                    <Order 
                    key={order.id} 
                    price={order.price}
                    ingredients={order.ingredients}/>
               ));
        };
        return orderList;
    };
};

const mapStateToProps =(state)=>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchedOrders(token,userId))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));