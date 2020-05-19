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
    // publicPath: "/",
    historyApiFallback: true
};

module.exports = {
    mode: environment,
    entry: {
        server: "./React_Project_Templete/src/server/server.tsx"
    },
    node: false,
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
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
                commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
            }
        }
    },
    externals: [nodeExternals()],
}