



// const plugins = [
//     new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
//         __DEV__: isDevelopment
//         //횐경변수 생성
//     }),
//     new HTMLWebpackPlugin({
//         template: 'app/index.ejs',
//         minify: {
//             removeComments: !isDevelopment,
//             collapseWhitespace: !isDevelopment,
//         },
//         isject: true
//     })
// ];

// isDevelopment && plugins.push(
//     new webpack.HotModuleReplacementPlugin(), 
//     new webpack.LoaderOptionsPlugin({ debug: true }),
//     new webpack.ProgressPlugin({ //progress,profile 옵션이며 빌드 되고 있는 현황을 좀더 수월하게 보여줌
//         activeModules:true,
//         profile:true,
//     })
// );

// module.exports = {
//     mode: isDevelopment ? 'development' : 'production',
//     cache: isDevelopment,
//     entry: entry,
//     devtool: isDevelopment ? 'eval' : 'hidden-source-map',
//     resolve: {
//         extensions: ['.js', '.css', '.html', '.jsx']
//     },
//     module: {
//         rules: [{
//             test: /\.jsx?$/,
//             use: {
//                 loader: 'babel-loader'
//             }
//         }]
//     },
//     output: {
//         path: path.join(__dirname, 'public'),
//         publicPath: '/',
//         filename: 'build.js',
//     },
//     plugins: plugins
// }

const path = require('path');
const webpack = require('webpack');
const isDevelopment = process.argv.indexOf('--development') !== -1
const nodeExternals = require("webpack-node-externals");
const mode = isDevelopment ? "development"  : "production"; 

const clientConfig ={
    mode,
    entry: isDevelopment ? ["@babel/polyfill","./src/client/client.jsx"] : ["@babel/polyfill","./src/client/client.jsx",],
    resolve:{
        extensions:['.js','.jsx','.css','.html']
    },
    devtool: isDevelopment ? 'eval' : 'hidden-source-map',
    module:{
        rules:[{
            test:/\.(jsx||js)?/,
            use:["babel-loader"],
        }]
    },
    plugins: isDevelopment ? [
        new webpack.DefinePlugin({
            __isServer__:"false",
            'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
        })
    ] : [
        new webpack.DefinePlugin({
            __isServer__:"false",
            'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
        })
    ],
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,"build"),
    }
}

const serverConfig = {
    entry : ["@babel/polyfill","./src/server/server.js"],
    mode,
    devtool: isDevelopment ? 'eval' : 'hidden-source-map',
    resolve: {
        extensions: ['.js', '.css', '.html', '.jsx']
    },
    output:{
        filename : "server.js",
        path: path.resolve(__dirname , "build"),
    },
    target:"node",
    module:{
        rules:[{
            test:/\.(js||jsx)?/,
            use:["babel-loader"]
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            __isServer__:"true",
            'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
        }),
    ],
    externals:[nodeExternals()]
}

module.exports = [serverConfig,clientConfig]