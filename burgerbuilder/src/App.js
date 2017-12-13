import React, { Component } from 'react';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Orders from './Containers/Orders/Orders';
import Checkout from './Containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <Layout>
          
            <Switch>
              <Route path="/orders" component = {Orders} />
              <Route path="/checkout" component = {Checkout} />
              <Route path="/"  component = {BurgerBuilder} />
            </Switch>
            
          
          </Layout>
        </BrowserRouter>  
      </div>
    );
  }
}

export default App;
