import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import HTMLWebpackPlugin from "html-webpack-plugin";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
console.log(isDevelopment);
const config: webpack.Configuration = {
  name: "busApp",
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : "eval",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
  },
  entry: {
    app: "./views/clinet",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "transform-remove-console", //production
          ],
          env: {
            development: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        },
        exclude: path.join(__dirname, "node_modules"),
      },
      {
        test: /\.css$/,
        // include: [
        //   path.resolve(__dirname,"")
        // ]
        use: [
          // MiniCssExtractPlugin.loader, //css 최적화??
          "style-loader", //MiniCssExtractPlugin 동시 사용 X
          "css-loader",
          // "postcss-loader",
          // "sass-loader",
          // "less-loader", //의미 없음
        ],
        // exclude: /node_modules/, //ReferenceError: document is not defined
      },
    ],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    //   // eslint: {
    //   //   files: "./src/**/*",
    //   // },
    // }),
    // new MiniCssExtractPlugin({
    //   filename: "style.[name].css",
    // }),//이미지 축소??
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? "development" : "production",
    }),
    new HTMLWebpackPlugin({ template: "./index.html" }),
  ],
  // target: "web",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/dist/",
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 5000,
    publicPath: "/dist/",
    hot: true,
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //   },
    // },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  // config.plugins.push(
  //   new BundleAnalyzerPlugin({ analyzerMode: "server", openAnalyzer: true })
  // );
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: "static" }));
}

export default config;
