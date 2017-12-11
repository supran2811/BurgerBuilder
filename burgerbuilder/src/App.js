import React, { Component } from 'react';
import {Route,Switch,Redirect,BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <Layout>
          
            <Switch>
              <Route path="/order" component = {BurgerBuilder} />
              <Route path="/checkout" component = {Checkout} />
              <Redirect from ="/" exact to="/order"/>
            </Switch>
            
          
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

export default App;
