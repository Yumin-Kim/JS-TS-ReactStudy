// const path = require('path');
// const webpack = require("webpack");
// const nodeExtenals = require("webpack-node-externals");
// const dev = process.env.NODE_ENV !== "production";

// const backendConfig = {
//   mode: dev ? 'development' : "production",
//   target:"node",
//   entry: {
//     server: './src/server/index.tsx',
//   },
//   resolve: {
//     extensions: ['.jsx', '.js', '.tsx', '.ts'],
//   },
//   module: {
//     rules: [{
//       test: /\.(tsx||ts)?$/,
//       loader: 'awesome-typescript-loader',
//       options:{
//         useBabel:true,
//         babelCore:"@babel/core",
//         babelOptions :{
//           babelrc:true
//         }
//       }
//     }],
//   },
//   output: {
//     filename: '[name].js',
//     path: path.join(__dirname, 'dist'),
//   },
//   plugins:[
//     new webpack.DefinePlugin({
//       __isServer__:"true",
//     })
//   ],
//   externals:[nodeExtenals()]
// }

// const frontConfig ={
//   mode: dev ? 'development' : "production",
//   entry: {
//     build: './src/client/index.tsx',
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts',".js",".jsx"],
//   },
//   module: {
//     rules: [{
//       test: /\.(tsx||ts)?$/,
//       loader: 'awesome-typescript-loader',
//       options:{
//         useBabel:true,
//         babelCore:"@babel/core",
//         babelOptions :{
//           babelrc:true
//         }
//       }
//     }],
//   },
//   output: {
//     filename: '[name].js',
//     path: path.join(__dirname, 'dist'),
//   },
//   plugins:[
//     new webpack.DefinePlugin({
//       __isServer__:"false"
//     })
//   ]
// }

// module.exports = [frontConfig];