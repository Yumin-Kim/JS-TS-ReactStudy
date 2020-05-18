//빌드 되면서 경로가 틀리는것 node라는 피일안에 집어 넣어서 main.js실행 시키면 경로를 찾지 못해 실행이 안됨

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



