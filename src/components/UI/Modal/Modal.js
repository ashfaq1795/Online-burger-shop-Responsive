import React, {Component} from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
<<<<<<< HEAD
=======
  componentDidUpdate(){
    console.log('[Modal] Did Update');
  }
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
  render(){
    return(
      <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
        }}
      >
        {this.props.children}
      </div>
    </Aux>
    );
  }
} 
export default Modal;
