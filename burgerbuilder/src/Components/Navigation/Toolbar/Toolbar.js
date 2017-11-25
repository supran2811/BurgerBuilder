import React from 'react';
import Logo from '../../Logo/Logo';

import classes from './Toolbar.css';

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>...</nav>
    </div>
);

export default toolbar;