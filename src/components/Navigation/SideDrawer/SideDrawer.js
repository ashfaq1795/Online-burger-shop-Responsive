import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
<<<<<<< HEAD
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
=======
        <div className={attachedClasses.join(' ')}>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
<<<<<<< HEAD
                <NavigationItems isAuthenticated={props.isAuth} />
=======
                <NavigationItems />
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer;