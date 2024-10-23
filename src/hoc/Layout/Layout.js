import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
<<<<<<< HEAD
import { connect } from "react-redux";
=======
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295

class Layout extends Component {
  state={
    showSideDrawer: false
  }

  sideDrawerClosedHandler=()=>{
    this.setState({showSideDrawer: false})
  }
  sideDrawerToggleHandler=()=>{
    this.setState((prevState)=>{
       return {showSideDrawer:!prevState.showSideDrawer}
  });
  }
  render() {
    return (
      <Aux>
<<<<<<< HEAD
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler} 
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}/>
=======
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}/>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
        <main className={classes.Content}>
          {/* display all components wrapped by layout component */}
          {this.props.children}
        </main>
      </Aux>
    );
  }
}
<<<<<<< HEAD
const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.token!=null
  }
}

export default connect(mapStateToProps)(Layout);
=======
export default Layout;
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
