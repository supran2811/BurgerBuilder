
import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = (props) => (
    <ul className = {classes.NavigationItems}>
        <NavigationItem link='/' >Burger Builder</NavigationItem>
        
        { props.isAuthenticated ? <Aux><NavigationItem link='/logout'>Logout</NavigationItem>
                                    <NavigationItem link='/orders'>Orders</NavigationItem></Aux>:
                                <Aux>
                                    <NavigationItem link='/auth?signin'>SignIn</NavigationItem>
                                    <NavigationItem link='/auth?signup'>SignUp</NavigationItem>
                                </Aux> }
        
        
    </ul>
);

export default navigationItems;