import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createStore , compose  , applyMiddleware ,combineReducers } from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth } from './store/sagas';

const reducers = combineReducers({
        burger:burgerBuilderReducer,
        order:orderReducer,
        auth:authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers,
                        composeEnhancers(
                                applyMiddleware(thunk,sagaMiddleware)
                        ));
sagaMiddleware.run(watchAuth);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render( app, document.getElementById('root'));

registerServiceWorker();      
