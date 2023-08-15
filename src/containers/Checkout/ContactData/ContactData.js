import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';


class ContactData extends Component{
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
        loading: false,
        formIsValid: false
    }
    formSubmissionHandler =(event)=>{
        event.preventDefault()
        this.setState({loading: true});
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
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
                    <Input elementtype={formElement.config.elementType} 
                    key={formElement.id}
                    elementconfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(event)=>{this.inputChangeHandler(event,formElement.id)}} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType='Success'>Order</Button>
            </form>
        );
        if(this.state.loading){
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
        ings: state.ingredients,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);
