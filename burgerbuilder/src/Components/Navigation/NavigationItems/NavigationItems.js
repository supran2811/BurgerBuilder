
import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link='/' >Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        <NavigationItem link='/auth?signin'>SignIn</NavigationItem>
        <NavigationItem link='/auth?signup'>SignUp</NavigationItem>
    </ul>
);

export default navigationItems;