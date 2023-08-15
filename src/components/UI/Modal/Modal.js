import React, {Component} from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  componentDidUpdate(){
    console.log('[Modal] Did Update');
  }
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
