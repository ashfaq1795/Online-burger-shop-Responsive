import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
<<<<<<< HEAD
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
=======

class Orders extends Component {

    state={
        orders: [],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true});
        axios.get('/orders.json')
        .then(response=>{
            const fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            console.log(fetchedOrders)
            this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(err=>{
            this.setState({loading: false});
        })
    }

    render(){
        let orderList=null;
        if(this.state.loading){
            orderList= <Spinner />
        } else {
            orderList= (
                <div>
               {this.state.orders.map(order =>(
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
                    <Order 
                    key={order.id} 
                    price={order.price}
                    ingredients={order.ingredients}/>
<<<<<<< HEAD
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
=======
               ))}
            </div>
            );
        }
        return orderList;
    }
}
export default withErrorHandler(Orders, axios);
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
