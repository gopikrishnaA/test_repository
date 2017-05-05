var webpack = require('webpack'),
    port = 8080,
    config = {
        entry: [
            './index.js'
        ],
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } },
                { test: /\.json$/, loader: 'json' }
            ]
        },
        resolve: {
            extensions: ['', '.js']
        },
        devtool: 'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './',
            port: port,
            watchOptions: { aggregateTimeout: 300, poll: 1000 },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Accept"
            }
        },
        bail: true,
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        }
    };

module.exports = config;
