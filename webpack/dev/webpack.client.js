const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports={
    mode : 'development',
    entry:"./Project/client/index.tsx",
    resolve:{
        extensions:[".js",".jsx",".ts",".tsx",".css",".scss",]
    },
    devServer:{
        contentBase : path.resolve(__dirname,"public")
    },
    module:{
        rules:[{
            test:/\.(ts|tsx)$/,
            exclude:/node_modules/,
            use:[
                "babel-loader",
                {
                    loader:"ts-loader",
                }
            ]
        }]
    },
    plugins:[
        new HTMLWebpackPlugin({
            filename:"index.html",
            template:path.resolve(__dirname,"./public/index.html")
        })
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: "react", chunks: "all" },
                commons: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: "common", chunks: "all" }
            }
        }
    },
    performance:{
        hints:false
    },
    output:{
        filename:"build.js",
        path:path.resolve(__dirname,"build")
    }    
}