import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
<<<<<<< HEAD
import * as actions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidation } from '../../../shared/Utility';


class ContactData extends Component{
    //we are managing this state here becuase we are using it only here not inany other component.
=======


class ContactData extends Component{
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
=======
        loading: false,
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
        formIsValid: false
    }
    formSubmissionHandler =(event)=>{
        event.preventDefault()
<<<<<<< HEAD
=======
        this.setState({loading: true});
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
<<<<<<< HEAD
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
=======
            orderData: formData
        }
        //.json target the firebase. order node will be created in firebase and all passed data will store beneath it.
        axios.post('/orders.json', order)
        .then(response => {
            // console.log(response);
            this.setState({loading: false});
            console.log(this.props);
            this.props.history.push('/');
        }).catch(error =>{
            // console.log(error);
            this.setState({loading: false});
        });
    }

    checkValidation  = (value,rules) =>{
        let isValid = true;
        //this is AND operation. if any one of them false the final result of isValid will be false. this is what we required.
        if (rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        if(rules.required){
            isValid = value !== 'select' && isValid;
        }
        if(rules.isEmail){
            const emailPattern=/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            isValid = emailPattern.test(value) && isValid;
        }
        if(rules.isNumeric){
            const pattern=/^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }
    inputChangeHandler =(event,inputIdentifier)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        } 
        //deep copy of object
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid= this.checkValidation(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
                    <Input 
                    key={formElement.id}
                    elementtype={formElement.config.elementType} 
=======
                    <Input elementtype={formElement.config.elementType} 
                    key={formElement.id}
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event)=>{this.inputChangeHandler(event,formElement.id)}} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType='Success'>Order</Button>
            </form>
        );
<<<<<<< HEAD
        if(this.props.loading){
=======
        if(this.state.loading){
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
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
<<<<<<< HEAD
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
=======
        ings: state.ingredients,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
