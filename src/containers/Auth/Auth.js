import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidation } from '../../shared/Utility';

class Auth extends Component {
    //we are managing this state here becuase we are using it only here not inany other component.
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig : {
                    type: 'text',
                    placeholder : 'Mail Address'
                },
                value : '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig : {
                    type: 'password',
                    placeholder : 'Password'
                },
                value : '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    };
    componentDidMount (){
        if(!this.props.building && this.props.authRedirectPath!=='/'){
            console.log(!this.props.building);
            console.log(this.props.authRedirectPath!=='/');
            this.props.onSetAuthRedirectPath();
        }
    }
    
    inputChangeHandler=(event,controlName)=>{
        const updatedControls= updateObject(this.state.controls,
            {[controlName]: updateObject(this.state.controls[controlName],
            {value: event.target.value,
             valid: checkValidation(event.target.value,this.state.controls[controlName].validation),
            touched: true})});
        this.setState({controls: updatedControls});
    };
    formHandler =(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    };
    switchAuthModeHandler =()=>{
        //we pass call back function within setState with prevState argument. React provide this argument automatically. if we use prevState argument in switchAuthModeHandler function then we have explicity pass previous state when we call switchAuthModeHandler function. In that case no need of callback function.
        this.setState(prevState=>{ 
            return {
                isSignUp: !prevState.isSignUp 
            };
        });
    };

    render () {
        const formElementArray= [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form=formElementArray.map(formElement =>(
            <Input
                key={formElement.id}
                elementtype={formElement.config.elementType} 
                elementconfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event)=>{this.inputChangeHandler(event,formElement.id)}} />
        ));
        if(this.props.loading){
            form= <Spinner/>;
        };
        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        };
        return (
            <div className={classes.Auth}> 
                {authRedirect}
                {this.props.error? this.props.error : null } 
                <form onSubmit={this.formHandler}>
                    {form} 
                    <Button btnType ="Success" > Submit </Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        );
    };
};
const mapStateToProps= (state)=>{
    return {
        isAuthenticated: state.auth.token!=null,
        error: state.auth.error,
        loading: state.auth.loading,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);