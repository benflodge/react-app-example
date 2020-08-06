const WEBPACK = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const path = require('path');
const { appInfo, version } = require('./package.json');

const workingDir = process.cwd();

module.exports = (env, { mode }) => {
    const production = mode === 'production';

    const config = {
        mode: production ? 'production' : 'development',
        resolve: {
            symlinks: false,
            modules: [path.resolve(workingDir, 'node_modules')]
        },
        entry: ['./src/main.js', './src/assets/scss/main.scss'],
        devtool: production ? '' : 'inline-source-map',
        output: {
            path: `${__dirname}/build/${production ? 'dist' : 'dev'}`,
            filename: `[name].js?version=${version}`
            // publicPath: ''
        },
        plugins: [
            new CleanWebpackPlugin([`build/${production ? 'dist' : 'dev'}`]),
            new WEBPACK.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    production ? 'production' : 'development'
                )
            }),
            new HtmlWebpackPlugin({
                template: './src/index.hbs',
                templateParameters: appInfo
            }),
            new MiniCssExtractPlugin({
                filename: `[name].css?version=${version}`
            })
        ],
        optimization: {
            splitChunks: production
                ? {
                      // Automatically split vendor and commons
                      // https://twitter.com/wSokra/status/969633336732905474
                      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
                      chunks: 'all'
                  }
                : {},
            minimizer: production
                ? [
                      new UglifyJsPlugin({
                          test: /\.js($|\?)/i,
                          uglifyOptions: {
                              compress: true,
                              output: {
                                  comments: false
                              }
                          }
                      }),
                      new OptimizeCSSAssetsPlugin({})
                  ]
                : undefined
        },
        module: {
            rules: [
                {
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        production
                            ? { loader: MiniCssExtractPlugin.loader }
                            : {
                                  loader: 'style-loader',
                                  options: { sourceMap: !production }
                              },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: !production }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: !production,
                                ident: 'postcss',
                                plugins() {
                                    return [Autoprefixer];
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: !production }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 150000
                            }
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: ['raw-loader']
                }
            ]
        }
    };

    return config;
};
