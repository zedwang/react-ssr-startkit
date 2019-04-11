import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "./layout";

const Root = ({store}) => (
    <ReduxProvider store={ store }>
        <Router>
            <Layout />
        </Router>
    </ReduxProvider>
    
);
export default Root;