const path = require("path");
const webpack = require("webpack")
const nodeExternals = require('webpack-node-externals');
const mode = process.env.NODE_ENV !== "production";
const NodemonPlugin = require("nodemon-webpack-plugin")
//문제점  >> production 모드시
//codespliting
//React 에서 추천하는 build 방법 숙지


//ts-loader 는 typescript를 javascript로 변환
//babel-loader는 문법 변환
const frontPlugins = [
    new webpack.DefinePlugin({
    __isServer__:"false",
})
]

// const plugins =  process.env.DEVELOP_COFIG !== "hot" ? frontPlugins : [...frontPlugins,new webpack.HotModuleReplacementPlugin()]
const plugins =  frontPlugins
const entry = "./src/client/index.tsx"
const clientConfig = {
  mode: mode ? "development" : "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  target: "web",
  entry: {
    build: entry,
  },
  module: {
    rules: [
      {
        test: /\.(ts||tsx)$/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  plugins,
};

const serverConfig = {
  mode: mode ? "development" : "production",
  target: "node",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  entry: {
    server: "./src/server/server.tsx",
  },
  module: {
    rules: [
      {
        test: /\.(ts||tsx)$/,
        use: ["babel-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      __isServer__: "true",
    }),
    // new NodemonPlugin(),
  ],
};

module.exports =[clientConfig , serverConfig];
// module.exports = serverConfig