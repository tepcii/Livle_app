import React, {Component} from 'react';
import {
    applyMiddleware,
    combineReducers,
    createStore,
  } from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

function configureStore(initialState = {}) {
  const persistConfig = {
    key: "livle",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(logger),
  );
  return store;
};

export default store = configureStore();
export const persistor = persistStore(store);
