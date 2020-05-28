const path = require("path");
const HTMLWebpackPlugins = require("html-webpack-plugin");
const devTool = process.env.NODE_ENV;

console.log(devTool);

module.exports = {
    mode:devTool ? devTool :"development",
    entry: {
        main: ["./PWA_React/main.js"]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "../../"),
    },
    // devServer:{
    //     contentBase: path.join(__dirname, '/build_PWA')
    // },
    module: {
        rules: [
            {
                test:/\.(jsx|js)$/,
                use:["babel-loader"],
            }
        ]
    },
    plugins:[
        // new HTMLWebpackPlugins({
        //     filename:"index.html",
        //     template:path.join(__dirname,"../public/index.html")
        // })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
}