import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

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
                    <Order 
                    key={order.id} 
                    price={order.price}
                    ingredients={order.ingredients}/>
               ))}
            </div>
            );
        }
        return orderList;
    }
}
export default withErrorHandler(Orders, axios);