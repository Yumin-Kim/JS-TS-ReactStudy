const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest') // build mainfest.json
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: './index.html',
})

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
})

const pwaPlugin = new WebpackPwaManifest({
    
    name: 'My Progressive Web App',
    short_name: 'MyPWA',
    description: 'My awesome Progressive Web App!',
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    gcm_sender_id :"592650319409", 
    icons: [
        {
            src: path.resolve('src/image/Icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        },
        {
            src: path.resolve('src/image/Icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
        },
        {
            src: path.resolve('src/image/maskable_icon.png'),
            size: '1024x1024',
            purpose: 'maskable'
        }
    ]
})

const workboxPlugin = new InjectManifest({
    swSrc: './src/sw.js',
    swDest: 'sw.js',
})

const config = mode => {
    const isDevelopMode = mode === 'development'
    return {
        entry: {
            app: ['@babel/polyfill', './src/index.js'],
        },
        output: {
            path: path.join(__dirname, '/build'),
            filename: 'index.bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: isDevelopMode
                                        ? '[path][name]__[local]--[hash:base64:7]'
                                        : '[name]__[local]--[hash:base64:7]',
                                },
                                importLoaders: 2,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,

                                // importLoaders: 1,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [htmlPlugin, cssPlugin, pwaPlugin, workboxPlugin],
    }
}

module.exports = (env, argv) => {
    const { mode } = argv
    return config(mode)
}
