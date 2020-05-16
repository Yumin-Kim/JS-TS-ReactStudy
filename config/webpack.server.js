const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const environment = process.env.NODE_ENV !== "production" ? "development" : "production";

//devServer variable
const devServer = {
    inline: true,
    port: 3000,
    hot: true,
    publicPath: "/",
    historyApiFallback: true
};
//code spliting variable
const optimization = {
        splitChunks: {
            cacheGroups: {
                react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
                commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
            }
        }
    }

module.exports = {
    mode: environment,
    entry: "./React_Project_Templete/src/server/server.tsx",
    target: "node",
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
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: "./React_Project_Templete/public/index.dev_.html"
        })
    ],
    ouput:{
        path:path.resolve(__dirname,'../React_Project_Templete/build'),
        filename:"[name].js",
        chunckFilename:"[name].js",
    },
    external:[nodeExternals()],
}