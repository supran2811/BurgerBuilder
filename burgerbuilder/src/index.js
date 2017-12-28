import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {createStore , compose  , applyMiddleware ,combineReducers } from 'redux';
import {Provider} from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';


const reducers = combineReducers({
        burger:burgerBuilderReducer,
        order:orderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

const app = <Provider store={store}>
                    <App />
            </Provider>

ReactDOM.render( app, document.getElementById('root'));

registerServiceWorker();      
