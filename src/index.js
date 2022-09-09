import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from "redux"
import { createRoot } from 'react-dom/client';
import auth from "./stores/reducers/auth";
import products from "./stores/reducers/products";

const rootReducer = combineReducers({
  auth,
  products,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const container = document.getElementById('root');
const root = createRoot(container);
root.render(

    <Provider store={store}>
      <App />
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
