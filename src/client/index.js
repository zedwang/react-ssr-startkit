import React from "react";
import ReactDOM from "react-dom";
import Root from './container';
import createStore from "./store";
import './styles/main.scss';
const {store} = createStore( window.REDUX_DATA );

const app = document.getElementById("root");
// resolve warning
// Warning: Expected server HTML to contain a matching <div> in <div>
// see:https://github.com/nozzle/react-static/issues/144
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod( < Root store = { store } />, app );

if (module.hot) {
    module.hot.accept('./container', () => {
        renderMethod( < Root store = { store }/>, app );
    });
}