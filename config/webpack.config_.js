//Resolve environment and import
const environment = process.env.NODE_ENV;
const isAnalyze = process.env.BUNDLE_AMALYZE !== "undefined";

const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const MiniCssExtractplugin = require("mini-css-extract-plugin");
const htmlPlugin = require("html-webpack-plugin");
const BundelAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require("path");
//Entry
const entry = {
    "main": ["./source/main.site.scss","./source/main.site.ts"]
}

const devEnv = environment !== "production";
//why need to exclude node_modules in webpack
//First
//Nearly all packages are written in js not in ts, it is not going to harm if we include node_modules
//Excluding node_modules at the transfile stage increate performance which could otherwise get a hit
//Second
//If we are referencing a pakeage that is written ts, we definitely want ts code to de complied to js code,then we have to include node_modules to make sure everything works. dont we?
//Yes. and then is the Key here. Excluding node_modules at the transpling stage doesn`t prevent webpack from its content at the bundling stage
const _module = {
    rules: [
        {
            test: /\.(tsx||ts)?$/,
            loader: 'awesome-typescript-loader',
            options: {
                useBabel: true,
                babelCore: "@babel/core",
                babelOptions: {
                    babelrc: true
                }
            }
        }, {
            test: /\.component.scss$/,
            // exclude: ["node_modules", "0-bourbon", "1-neat", "2-base"],\ㅊ
            use: [
                "raw-loader",//this module can import   to the transforming txt file
                "sass-loader"
            ]
        }, {
            test: /\.site.scss$/,
            // exclude: ["node_modules", "0-bourbon", "1-neat", "2-base"],
            use: [
                devEnv ? "style-loader":
                {
                    loader: MiniCssExtractplugin.loader,
                    options: {
                        hmr: environment === "development" ? true : false,
                    }
                },"css-loader", "sass-loader"
            ]
        }
    ]
}

const optimization = {
    splitChunks: {
        cacheGroups: {
            commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all"
               }
            }
        }
    }



const output = {
    filename: "[name].bundle.js",
    path: path.resolve( "public"),
    pathinfo: true,
}

if (environment === "production") {
    output.filename = "[name].bundle.min.js";
    output.pathinfo = false;
} else if (environment === "development") {
    output.publicPath = "/js/";
}

const plugins = [
    new MiniCssExtractplugin({
        filename: '[name].css',
        chunkname: '[id].css',
        ignoreOrder: false,
    }),
    new htmlPlugin({
        template:'./index.html'
    }),
    
]

if(!devEnv && isAnalyze ){
    plugins.push(new BundelAnalyzerPlugin())
}

const resolve = {
    extensions: [".ts", ".js", ".jsx", ".tsx", ".css", "scss"]
}

module.exports = {
    mode: environment === "development" ? "development" : "production",
    entry,
    output,
    resolve,
    plugins,
    optimization,
    module: _module,
}