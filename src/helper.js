export function isMobile(headers) {
    return headers['user-agent'].test(/Mobile/);
}

export function webpackMiddleware(app) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config');
    const compiler = webpack(config);
    const devMiddleware =  webpackDevMiddleware(compiler, {});
    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler, {
        path: '/__webpack_hmr', 
        heartbeat: 10 * 1000
    }));
    return {devMiddleware, config};
}
