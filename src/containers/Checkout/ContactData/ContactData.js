import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidation } from '../../../shared/Utility';


class ContactData extends Component{
    //we are managing this state here becuase we are using it only here not inany other component.
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Street'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'ZIP Code'
                },
                value : '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Country'
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig : {
                    type: 'email',
                    placeholder : 'Your E-Mail'
                },
                value : '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig : {
                    options: [
                        {value : 'select', displayVale : 'Select Delivery Method'},
                        {value : 'fastest', displayVale : 'Fastest'},
                        {value : 'cheapest', displayVale : 'Cheapest'}
                    ]       
                },
                value : '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false   
            },
        },
        formIsValid: false
    }
    formSubmissionHandler =(event)=>{
        event.preventDefault()
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        //.json target the firebase. order node will be created in firebase and all passed data will store beneath it.
        this.props.onOrderBurger(order,this.props.token);
       
    }

    inputChangeHandler =(event,inputIdentifier)=>{
        const updatedFormElement =updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid: checkValidation(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid=true;
        for(let key in updatedOrderForm){ 
            //for each change in form it iterate the whole updatedOrderForm and return the final value of formIsValid.
            formIsValid=updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }
    render(){
        const formElementArray= [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.formSubmissionHandler}>
                {formElementArray.map(formElement =>(
                    <Input 
                    key={formElement.id}
                    elementtype={formElement.config.elementType} 
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event)=>{this.inputChangeHandler(event,formElement.id)}} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType='Success'>Order</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    };
};

const mapStateToProps= state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch=>{
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
