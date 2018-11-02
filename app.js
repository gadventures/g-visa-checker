import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line
import polyfill from 'babel-polyfill'

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import {VisaChecker, visaCheckReducer} from './index'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        visachecker: visaCheckReducer
    }),
    composeEnhancers(),
)

ReactDOM.render(
    <Provider store={store}>
        <VisaChecker destinations={'IN, US'}/>
    </Provider>,
    document.getElementById('root')
);
