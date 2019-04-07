const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json')));
const isDev = process.env.NODE_ENV === 'development';
const sourceMap = isDev ? 'inline-source-map' : 'source-map';
const mode = isDev ? 'development' : 'production';

const banner =
`${pkg.name} ${pkg.version} <${pkg.homepage}>
Copyright (c) ${(new Date()).getFullYear()} ${pkg.author.name} <${pkg.author.url}>
Released under ${pkg.license} License`;

const clientPlugins = [
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin(
        {
            title: '企业资信报告平台-遂宁银行',
            filename: 'app.tpl',
            inject: true,
            template: 'app.html'
        }
    ),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
];

if (!isDev) {
    clientPlugins.push(new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
    context: path.resolve(__dirname, 'src/client'),
    entry: () => {
        const entries = ['./index'];
        if (isDev) {
            entries.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
        }
        return entries;
    },
    mode,
    output: {
        path: path.resolve( __dirname, "dist/public" ),
        filename: isDev ? '[name].js' : '[name].[hash].js',
        chunkFilename: isDev ? '[name].js' : '[id].[hash].js',
    },
    devtool: sourceMap,
    plugins: clientPlugins,
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
        
    },
    module: {
        rules: [
            {
                test: /\.(js)?$/,
                exclude: /(node_modules)/,
                use: [ "babel-loader"],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][hash].[ext]',
                            outputPath: '/'
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
};