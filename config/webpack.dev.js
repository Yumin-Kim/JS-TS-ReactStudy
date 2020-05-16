const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const enviroment = process.env.NODE_ENV !== "production" ? "development" : "production"

module.exports = {
    mode: enviroment,
    entry: "./React_Project_Templete/src/client/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true,
        publicPath: "/",
        historyApiFallback: true
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            use: ['babel-loader', "ts-loader"],
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: "./React_Project_Templete/public/index.dev_.html"
        })
    ],
    // optimization :{
    //     splitChunks: {
    //         cacheGroups: {
    //             react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
    //             commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
    //         }
    //     }
    // }
}