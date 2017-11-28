
import React from 'react';
import classes from './DrawerToggler.css';

const drawerToggler = (props) => (
    <div onClick={props.click} className = {classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggler;