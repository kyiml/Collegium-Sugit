const path = require('path');

module.exports = {
    entry: {
        styles: ['./hosted/static/scss/base.scss']
    },
    output: {
        path: path.join(__dirname, 'hosted/generated')
    },
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
                    {
                        loader: 'sass-loader',
                    },
                ],
            }
        ]
    }
};