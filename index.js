import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App';
import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './src/test_redux_observable/Epic';

import TestReduxObservable from './src/test_redux_observable/TestReduxObservable';

const defaultState = {
    count: 0
}

export const actionCount = (numPlus) => {
    return {
        type: "INCREASE",
        numPlus: numPlus
    }
}

const demoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "INCREASE":
            return {
                ...state,
                count: state.count + 1
            }
        case "INCREASE_DONE":
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }
}

const allReducers = combineReducers({
    DEMO: demoReducer
});

const epicMiddleware = createEpicMiddleware();


const store = createStore(
    allReducers,
    // {},
    applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

const AppRedux = () => {
    return (
        <Provider store={store}>
            <TestReduxObservable />
        </Provider>
    )
}


AppRegistry.registerComponent('ForTestLib', () => AppRedux);
