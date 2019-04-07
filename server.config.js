const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const isDev = process.env.NODE_ENV === 'development';
const mode = isDev ? 'development' : 'production';
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));
const banner =
`${pkg.name} ${pkg.version} <${pkg.homepage}>
Copyright (c) ${(new Date()).getFullYear()} ${pkg.author.name} <${pkg.author.url}>
Released under ${pkg.license} License`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './server.js',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    mode,
    output: {
        path: path.resolve(__dirname, 'dist/bin'),
        filename: "server.bundle.js",
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.BannerPlugin(banner),
    ],
    externals: [webpackNodeExternals({
        // whitelist: ['express', 'dotenv', 'node-html-parser', 'react', 'react-dom/server', 'react-router-dom', 'react-redux']
    })],
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
            },
        ]
    }
};