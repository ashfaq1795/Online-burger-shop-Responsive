import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
<<<<<<< HEAD
import { Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';


=======
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
class Checkout extends Component{

    checkoutCancelledHandler =() =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler =() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
<<<<<<< HEAD
        let checkOut=<Redirect to ="/" />
        if(this.props.ings){
            const purchasedRedirect= this.props.purchased ? <Redirect to='/' /> : null;
            checkOut= (
            <div>
                {purchasedRedirect}
=======

        return(
            <div>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler} 
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} 
                 component={ContactData} />
            </div>
<<<<<<< HEAD
            );
        }

        return checkOut;
=======
        )
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    }
}

const mapStateToProps=state=>{
    return {
<<<<<<< HEAD
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

=======
        ings : state.ingredients
    };
};
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
export default connect(mapStateToProps)(Checkout);