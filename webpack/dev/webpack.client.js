const path = require("path");
const webpack = require("webpack");
//one of webpack property in externals is    
const nodeExternals = require("webpack-node-externals");
//Main purpose is to provide css file on  mini size 
const MiniCssExtractPlugins = require("mini-css-extract-plugin");
//This is TypeSCript transformer that improves development experience of styled-Component. 
// Main purpose is to provide complie-time information of creates styled-component, sush as names of these components for the allowing to operate with proper names of such the components
const createStyledComponentTransformer = require("typescript-plugin-styled-components").default;
const HTMLWebpackPlugin = require("html-webpack-plugin");

const LoadablePlugins = require("@loadable/webpack-plugin");

const styledComponentsTransformer = createStyledComponentTransformer();
const hotMiddlewareScript = 'webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true';

const getEntry = (target) => {
    if (target === "node") return ["./Project/client/App.tsx"];
    else return ["./Project/client/index.tsx"]
}

const validConfigPlugins = (target) => {
    return target === "web" ? [new LoadablePlugins(), new HTMLWebpackPlugin({
        filename:"index.html",
        template:path.resolve(__dirname,"../public/index.html"),
    })] : [new LoadablePlugins()]
}

const getConfig = (target) => ({
    mode: 'development',
    entry: getEntry(target),
    target,
    name: target,
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss",],
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                    },
                }
            ]
        }]
    },
    plugins: validConfigPlugins(target),
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
                commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
            }
        }
    },
    externals: target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
    performance: {
        hints: false
    },
    output: {
        filename: "[name].js",
        chunkFilename: '[id].js',
        path: path.resolve(__dirname, `build/${target}`),
        publicPath: "/web/",
    }
})



module.exports = [getConfig("web"), getConfig("node")];