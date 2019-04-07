import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import routes from "../routes";

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to React SSR!",
        };
    }

    render() {
        return (
            <>
                <Header />
                <div className="main container">
                    <div className="main-content">
                        <div className="padding-left-15">
                            <Switch>
                                { routes.map( route => <Route key={ route.path } { ...route } /> ) }
                            </Switch>
                        </div>
                        
                    </div>
                   
                </div>
                <Footer/>
            </>
        );
    }
}

export default Layout;
