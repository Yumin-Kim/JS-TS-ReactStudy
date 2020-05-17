const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

const enviroment = process.env.NODE_ENV !== "production" ? "development" : "production"

module.exports = {
    mode: enviroment,
    entry: [hotMiddlewareScript,"./React_Project_Templete/src/client/index.tsx"],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            use: ['babel-loader', "ts-loader"],
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // new HTMLWebpackPlugin({
        //     filename: 'index.html',
        //     template: "./React_Project_Templete/public/index.dev_.html"
        // })
    ],
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'[name].js',
        publicPath:'/',
    }
}