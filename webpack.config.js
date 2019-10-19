const path = require('path')
const webpack = require('webpack')
const _externals = require('externals-dependencies')

module.exports = {
    mode: 'production',
    // devtool: 'source-map',
    devtool: 'none',
    cache: true,
    entry: {
        app: [
            // 如果polyfill放在这里, 打包的时候将不会被external, 必须在js里require才能有效external
            // 'babel-polyfill',
            './src/app.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
        chunkFilename: 'js/[id].chunk.js'
    },
    resolve: {
        extensions: ['.js']
    },
    target: 'node',
    externals: [_externals()],
    context: __dirname,
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}
