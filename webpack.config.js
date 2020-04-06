const path = require("path");
const webpack = require("webpack")
const nodeExternals = require('webpack-node-externals');
const mode = process.env.NODE_ENV !== "production";
//문제점  >> production 모드시
//codespliting
//React 에서 추천하는 build 방법 숙지
const frontPlugins = [
    new webpack.DefinePlugin({
    __isServer__:"false",
})
]

const plugins =  process.env.DEVELOP_COFIG !== "hot" ? frontPlugins : [...frontPlugins,new webpack.HotModuleReplacementPlugin()]
console.log(plugins)
const entry = process.env.DEVELOP_COFIG !== "hot" ? ["./src/client/main.js"] : ['webpack-hot-middleware/client?reload=true',"./src/client/main.js"]
const clientConfig = {
    mode:mode ? "development":"production"  ,
    target:'web',
    entry:{
        build: entry
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:["babel-loader"]
        }]
    },
    output : {
        filename:"[name].js",
        path:path.resolve(__dirname,"build"),
        publicPath:'/'
    },
    plugins
}

const serverConfig = {
    mode:mode ? "development":"production"  ,
    target:'node',
    entry:{
        server:"./src/server/server.js"
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:["babel-loader"]
        }]
    },
    output : {
        filename:"[name].js",
        path:path.resolve(__dirname,"build")
    },
    externals: [nodeExternals()],
    plugins:[
        new webpack.DefinePlugin({
            __isServer__:"true",
        })
    ]
}

module.exports =[clientConfig , serverConfig];