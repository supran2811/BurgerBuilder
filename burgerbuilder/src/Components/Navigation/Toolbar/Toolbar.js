import React from 'react';
import Logo from '../../Logo/Logo';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <DrawerToggler click = {props.openSideDrawer}/>        
        <div className = {classes.Logo}>
            <Logo />
        </div>
        
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>
        </nav>
    </div>
);

export default toolbar;