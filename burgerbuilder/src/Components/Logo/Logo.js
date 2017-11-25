
import React from 'react';
import brandImage from  '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = () => (
    <div className = {classes.Logo}> <img src = {brandImage} alt="Burger Builder"/> </div>
);

export default logo;