import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess=(token,userId)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

// syc action creater.
export const authFail = (err) =>{
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};


export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

// async action creaters. it return another function which take dispatch as an action.
//this action is used for a scenario where the token is expired and we are not using the reset token property, also we don't refresh the page so that the token doesn't loose. In this case if we send request required token, we can get a strange spot of having token which is not valid anymore without us seeing that. so we add this action to invalide the token after expiry date.
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout()); //This action will dispatch after expiry time.
        }, expirationTime * 1000);
    }
}
export const auth = (email,password, isSignUp) =>{
    return dispatch => {
        dispatch(authStart());
        //we send authentication data as a js object but axios automatically convert it to json format b/c auth data format is jsn.
        const authData={
            email: email,
            password: password,
            returnSecureToken: true
        }
        //this is the sign up link.
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbGpmm8YVEj8Y_qL6cuxTLymRGP4Oa1rs';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbGpmm8YVEj8Y_qL6cuxTLymRGP4Oa1rs';
        };
        axios.post(url,authData)
        .then(response=>{
            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('userId',response.data.localId)
            //we also need to store the expiray date  of token in local storage.
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err=>{
            console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error.message));
        });
    };
};
export const setAuthRedirectPath = (path) =>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () =>{
    return dispatch=> {
        const token = localStorage.getItem('token');
        if(!token){
            //if token is not set then we don't need to do anything or dispatch any function but we could dispatch authlogout function.
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - 
                new Date().getTime())/1000));
            } else {
                dispatch(authLogout());
            }
        }
    }
}