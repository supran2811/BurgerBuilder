import React , { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                <Toolbar openSideDrawer={this.toggleSideDrawerHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} 
                        backdropClosed={this.toggleSideDrawerHandler} />
                <main className= {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout;
