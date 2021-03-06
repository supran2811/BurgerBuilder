import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from  './store/actions/index';
import './App.css';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Auth/Logout/Logout';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const AsyncOrders  = asyncComponent( () => (import('./Containers/Orders/Orders'))  );
const AsyncCheckout = asyncComponent( () => (import('./Containers/Checkout/Checkout'))  );
const AsyncAuth = asyncComponent(() => (import('./Containers/Auth/Auth')));


class App extends Component {
  
  componentDidMount(){
      this.props.isUserAuthenticated();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component = {AsyncAuth} />
        <Route path="/" exact component = {BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
    
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/orders" component = {AsyncOrders} />
          <Route path="/checkout" component = {AsyncCheckout} />
          <Route path="/logout" component = {Logout} />
          <Route path="/auth" component = {AsyncAuth} />
          <Route path="/" exact component = {BurgerBuilder} />
          <Redirect to ="/" />
        </Switch>
      );
    }


    return (
      <div className="App">
          <Layout>
              {routes}    
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  isUserAuthenticated : () => dispatch(actions.isUserAuthenticated())
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
