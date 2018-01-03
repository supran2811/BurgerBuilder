import React , { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    
    state = {
        showSideDrawer:false
    }
    
    toggleSideDrawerHandler = () => {
        this.setState(prevState => ({showSideDrawer:!prevState.showSideDrawer}) );
    }


    render(){
        return (
            <Aux>
                <Toolbar isAuthenticated = {this.props.isAuthenticated} 
                        openSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer isAuthenticated = {this.props.isAuthenticated} 
                        open = {this.state.showSideDrawer} 
                        backdropClosed={this.toggleSideDrawerHandler} />
                <main className= {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated : state.auth.token !== null
    }
);

export default connect(mapStateToProps)(Layout);
