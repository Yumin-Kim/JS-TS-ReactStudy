const path = require("path");
const HTMLWebpackPlugins = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackManiPlugin = require("webpack-pwa-manifest");

const devTool = process.env.NODE_ENV;

//Need to Mainfest.json
const workBoxPlugin = new InjectManifest({
    swSrc: "./PWA_React/sw.ts",
    swDest: 'sw.js',
    exclude: [
      /\.map$/,
      /manifest$/,
      /\.htaccess$/,
      /service-worker\.js$/,
      /sw\.js$/,
    ],})

const manifestPlugin = new WebpackManiPlugin({
    name: 'My Progressive Web App Tutorial',
    short_name: 'Tutorial',
    description: 'My awesome Progressive Web App!',
    background_color: '#2196f3',
    icons: [
        {
            src: path.resolve('PWA_React/image/Icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
            src: path.resolve('PWA_React/image/Icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
        },
        {
            src: path.resolve('PWA_React/image/maskable_icon.png'),
            size: '1024x1024',
            purpose: 'maskable'
        }
    ] 
}) 

const HTMLPlugin = new HTMLWebpackPlugins({
    filename: "index.html",
    template: path.join(__dirname, "../public/index.html")
});

module.exports = {
    mode: "production",
    devtool: 'source-map',
    entry: {
        main: ["./PWA_React/main.tsx"]
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "build_PWA"),
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, '/build_PWA')
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                }
            ]
        }]
    },
    performance:{hints:false},
    plugins: [HTMLPlugin, workBoxPlugin ,manifestPlugin],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
}