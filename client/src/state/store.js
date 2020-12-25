import React from 'react';
import { combineReducers, createStore } from 'redux';
import Reducer from './reducers/reducer';


const combined_Reducers = combineReducers({ 
    Reducer,
});


const Store = createStore(combined_Reducers);

export default Store;