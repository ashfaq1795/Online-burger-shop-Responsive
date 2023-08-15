import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';

const withErrorHandler= (WrappedComponent,axios) =>{
 return class extends Component{
    state={
        error: null
    }
    componentWillMount(){
        this.reqInterceptor=axios.interceptors.request.use(req =>{
            this.setState({error: null});
            return req;
        });
        this.resInterceptor=axios.interceptors.response.use(res => res, error =>{
            this.setState({error: error});
        });
    }
    componentWillUnmoint(){ 
        //with each call of WrappedComponenet (Basically BurgerBuilder) new instance of interceptor is created it cause memory filling also these are code which run every time so we don't need old interceptor just need latest one we can remove it as below. 
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () =>{
        this.setState({error: null})
    }

    render(){
        return (
            <Aux>
            <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
            </Aux>
        );
    }
 }

}

export default withErrorHandler;