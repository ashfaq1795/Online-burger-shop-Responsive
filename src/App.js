import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
<<<<<<< HEAD
import {Route,Switch, withRouter,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent'; 

//lazy loading.
const asyncCheckout = asyncComponent (()=>{
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent (()=>{
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent (()=>{
  return import('./containers/Auth/Auth');
});

class App extends Component{

  componentDidMount (){
    this.props.onAutoSignIn();
  }
  render(){
    //Routes gaurding. unathenticated user can only access '/auth' and '/' paths.
    let Routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        {/* if no route match redirect to home page. */}
        <Redirect to='/' />
    </Switch>
    );
    //authenticated user can access all accept '/auth'.
    if(this.props.isAuthenticated){
     Routes=( 
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          {/* As we don't need to access auth page after authentication but if I don't render it after authentication then making burger before the authentication and then we authenticate ourself and after authentication we can't redirect to checkout page as we want because the redirection process occur in Auth container and in authentication portion if we don't add auth route as below then Auth container will not render and  we will not  redirect to checkout page.  */}
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          {/* exact avoid us from the prefix of the path */}
          {/* if no routes match redirect to home page */}
          <Redirect to='/' />
        </Switch>
     )
    }
  return (
    <div>
      <Layout>
        {Routes}
=======
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component{
  render(){
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' exact component={BurgerBuilder} />
          {/* exact avoid us from the prefix of the path */}
        </Switch>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
      </Layout>
    </div>
  );
  }
}
<<<<<<< HEAD

const mapStateToProps = (state) =>{
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps= (dispatch)=>{
  return {
    onAutoSignIn : ()=> dispatch(actions.authCheckState())
  }
}
//this app component always render with each route. so if we connect like these components with redux store we should wrap this component with "withRouter" HOC too. otherwise this component will not receive the route props and the pages will not change on routing. the HOC will enforce our route props being passed down to our app component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


    // react-test-renderer and enzyme-adapter-react-16 are two additional packages  used with eznyme library/package to work correctly with jest and react. 
=======
export default App;
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
