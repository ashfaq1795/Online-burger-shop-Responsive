import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolBar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle  clicked={props.drawerToggleClicked} />
        <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
<<<<<<< HEAD
            <NavigationItems isAuthenticated={props.isAuth} />
=======
            <NavigationItems />
>>>>>>> c8515375063b10dd1fae9dcc2c9e7a3c5ceaa295
        </nav>
    </header>
);

export default toolBar;
