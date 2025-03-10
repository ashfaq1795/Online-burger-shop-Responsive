import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
   
        componentDidMount(){
            this.props.isLogout();
        };

    render(){
        return <Redirect to='/'/>;
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        isLogout:()=> dispatch(actions.authLogout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);