import path from "path";
import express from "express";
import dotenv from 'dotenv';
import cheerio from 'cheerio';
import morgan from 'morgan';
import proxy from 'http-proxy-middleware';
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import routes from "./client/routes";
import Layout from "./client/layout";
import createStore from "./client/store";
import { isMobile, webpackMiddleware } from './helper';

dotenv.config();

let staticPath, fs;

const { PORT = 8080, NODE_ENV } = process.env;
const app = express();
if (NODE_ENV !== 'production') {
    const {devMiddleware, config} =  webpackMiddleware(app);
    staticPath = config.output.path;
    fs = devMiddleware.fileSystem;
    app.use(morgan('dev'));
} else {
    // production
    staticPath = path.resolve(__dirname, "../public");
    app.use(express.static(staticPath));
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
    app.use(morgan('combined', { 
        skip: (req, res) => res.statusCode < 400,
        stream: accessLogStream }));
}   

// app.use("/api/**", proxy({
//     target: 'https://xxx.com'
// }));

app.get('/api/**', (req, res) => {
    const data = require('./api');
    res.send(data);
});

app.get("/*", (req, res) => {
    const context = {};
    const {store} = createStore();
    const {dispatch} = store;
    const dataRequirements =
        routes
            .filter(route => matchPath(req.url, route))
            .map(route => route.component)
            .filter(comp => comp.serverFetch)
            .map(comp => {
                const {type, payload} = comp.serverFetch;
                return dispatch({type, payload});
            });

    Promise.all(dataRequirements).then(() => {
        const jsx = (
            <ReduxProvider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString(jsx);
        const reduxState =  store.getState() || {data: [], config: {desktop: !isMobile, sso: 'https://sso.com'}};

        res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache" });
        res.end(htmlTemplate(reactDom, reduxState));
    });
});



app.listen(PORT, () => {
    console.log(`server runing at http://localhost:${PORT}...`);
});

function htmlTemplate(reactDom, reduxState) {
    fs = fs || require('fs');
    const indexPath = path.resolve(staticPath, 'app.tpl');
    const indexHtml = fs.readFileSync(indexPath).toString();
    const $ = cheerio.load(indexHtml);
    $('#root').append(reactDom);
    $('body').prepend(`<script>window.REDUX_DATA = ${JSON.stringify(reduxState)}</script>`);
    return $.html();
}
