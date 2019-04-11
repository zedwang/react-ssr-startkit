import React from "react";
import ReactDOM from "react-dom";
import Root from './container';

import createStore from "./store";
const {store} = createStore( window.REDUX_DATA );
import './styles/main.scss';

const app = document.getElementById( "root" );

ReactDOM.hydrate( Root, app );

if (module.hot) {
    module.hot.accept('./container', () => {
        ReactDOM.hydrate( <Root store={store}/>, app );
    });
}
