const MODULE_webpack = require('webpack');
const MODULE_path = require('path');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        react_components: ['./views/react/bootstrapper.jsx'],
        styles: [
            './hosted/static/scss/base.scss',
            './hosted/static/scss/spacing.scss'
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: MODULE_path.join(__dirname, 'hosted/generated')
    },
    plugins: [
        new MODULE_webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: '/generated'
                },
            }
        ]
    }
};