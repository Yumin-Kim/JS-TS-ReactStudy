const path =require("path")
const webpack = require("webpack");
const nodeExternalsModule = require("webpack-node-externals");

module.exports = {
    mode:"development",
    entry:{
        server :"./Project/server/Server.tsx",
    },
    node:false,
    target:"node",
    resolve:{
        extensions:[".js",".jsx",".ts",".tsx"]
    },
    module:{
        rules:[{
            test:/\.(ts|tsx)$/,
            use:["babel-loader","ts-loader"]
        }]
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"build"),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
                commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
            }
        }
    },
    externals:[nodeExternalsModule()],
}