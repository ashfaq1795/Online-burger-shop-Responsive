import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact> Burger Builder </NavigationItem>
<<<<<<< HEAD
        {props.isAuthenticated ?  <NavigationItem link="/orders"> Orders </NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/logout"> logout </NavigationItem> :
        <NavigationItem link="/auth"> Authenticate </NavigationItem>}
=======
        <NavigationItem link="/orders"> Orders </NavigationItem>
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
    </ul>
);

export default navigationItems;