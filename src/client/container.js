import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "./layout";
import createStore from "./store";
const {store} = createStore( window.REDUX_DATA );

const Root = (
    <ReduxProvider store={ store }>
        <Router>
            <Layout />
        </Router>
    </ReduxProvider>
    
);
export default Root;