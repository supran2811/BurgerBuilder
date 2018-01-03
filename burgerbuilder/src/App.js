import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from  './store/actions/index';
import './App.css';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import Checkout from './Containers/Checkout/Checkout';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';

class App extends Component {
  
  componentDidMount(){
      this.props.isUserAuthenticated();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component = {Auth} />
        <Route path="/" exact component = {BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
    
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/orders" component = {Orders} />
          <Route path="/checkout" component = {Checkout} />
          <Route path="/logout" component = {Logout} />
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
