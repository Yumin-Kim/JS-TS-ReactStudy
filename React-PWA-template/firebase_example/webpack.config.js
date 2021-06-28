const path = require("path");

module.exports = {
    mode:"production",
    entry: {
        index: ["./src/index.js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "public"),
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use:"babel-loader",
                exclude:/node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [],
}