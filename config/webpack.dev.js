//빌드 되면서 경로가 틀리는것 node라는 피일안에 집어 넣어서 main.js실행 시키면 경로를 찾지 못해 실행이 안됨


const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const LoadablePlugins = require("@loadable/webpack-plugin");
const MiniCssExtractPlugins = require("mini-css-extract-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default

const devMode = process.env.NODE_ENV !== "production";
const styledComponentsTransformer = createStyledComponentsTransformer();
const hotMiddlewareScript = 'webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true';

const getEntryPoint = target => {
    if (target === "node") return ['./React_Project_Templete/src/server/server.tsx'];
    return devMode ? [hotMiddlewareScript, "./React_Project_Templete/src/client/index.tsx"] : ["./React_Project_Templete/src/client/index.tsx"];
};

const getConfig = target => ({
    mode: devMode ? 'development' : "production",
    name: target,
    target,
    entry: getEntryPoint(target),
    output: {
        path: path.resolve(__dirname, `build/${target}`),
        filename: `[name].js`,
        publicPath:'/web/',
        libraryTarget: target === "node"  ? "commonjs2" : undefined
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
                    },
                }
            ]
        }, {
            test: /\.(scss|css)$/,
            use: [MiniCssExtractPlugins.loader, "css-loader", "sass-loader"]
            // use:devMode ? "style-loader" : [MiniCssExtractPlugins.loader,"css-loader","sass-loader"]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        alias: {
            pages: path.resolve('src/client/page/'),
            components: path.resolve('src/client/components/'),
            actions: path.resolve('src/client/store/actions/'),
            reducers: path.resolve('src/client/store/reducers/'),
            // util: path.resolve('src/client/util/'),
        }
    },
    plugins: target === "web"
        ? [new LoadablePlugins(), new MiniCssExtractPlugins(), new webpack.HotModuleReplacementPlugin()]
        : [new LoadablePlugins(), new MiniCssExtractPlugins()],
    externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,

})

module.exports = [getConfig("web"), getConfig("node")];


