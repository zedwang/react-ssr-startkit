import React from "react";
import ReactDOM from "react-dom";
import Root from './container';
import './styles/main.scss';

const app = document.getElementById( "root" );

ReactDOM.hydrate( Root, app );

if (module.hot) {
    module.hot.accept();
}
