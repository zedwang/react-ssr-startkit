import path from "path";
import dns from 'dns';
import os from 'os';
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
    // 此处的路径是相对于构建路径
    staticPath = path.resolve(__dirname, "../public");
    app.use(express.static(staticPath));
    // 仅仅记录错误日志
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
    app.use(morgan('combined', { 
        skip: (req, res) => res.statusCode < 400,
        stream: accessLogStream }));
}   

// app.use("/api/**", proxy({
//     target: 'https://github.com'
// }));

app.use('/api/**', (req, res, next) => {
    console.log('use', req.url);
    next();
});

app.get("/*", (req, res) => {
    const context = {};
    const {store} = createStore();

    const dataRequirements =
        routes
            .filter(route => matchPath(req.url, route))
            .map(route => route.component)
            .filter(comp => comp.serverFetch)
            .map(comp => store.dispatch(comp.serverFetch()));

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
    dns.lookup(os.hostname(), (err, address) => {
        console.log(`server runing at http://${address}:${PORT}...`);
    });
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
