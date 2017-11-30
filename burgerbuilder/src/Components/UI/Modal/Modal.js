import React , { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';

class Modal extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show;
    }

    render(){
        return (
            <Aux>
                <Backdrop  show = {this.props.show} close = {this.props.modalClosed} />
                <div className = {classes.Modal}
                    style = {{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show?1:0}}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 
export default Modal;