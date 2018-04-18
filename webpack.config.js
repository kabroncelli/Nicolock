var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
var BundleTracker = require('webpack-bundle-tracker')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'nicolock/static/build')
var APP_DIR = path.resolve(__dirname, 'nicolock/client')

var config = {
  entry: {
    main: path.resolve(APP_DIR, 'js/app.js'),
    account: path.resolve(APP_DIR, 'account/index.jsx'),
    map: path.resolve(APP_DIR, 'nico-map/index.jsx'),
    videos: path.resolve(APP_DIR, 'videos/index.jsx'),
    search: path.resolve(APP_DIR, 'search/index.jsx'),
    faqs: path.resolve(APP_DIR, 'faqs/index.jsx'),
    liking: path.resolve(APP_DIR, 'liking/index.jsx'),
    contractor: path.resolve(APP_DIR, 'contractor/index.jsx'),
    findContractors: path.resolve(APP_DIR, 'find-contractors/index.jsx'),
    gallery: path.resolve(APP_DIR, 'gallery/index.jsx'),
    product: path.resolve(APP_DIR, 'product/index.jsx'),
    events: path.resolve(APP_DIR, 'events/index.jsx'),
    styles: path.resolve(APP_DIR, 'sass/styles.js'),
    vendor: [
      'axios', 'babel-polyfill', 'django-react-csrftoken', 'jquery', 'leaflet',
      'moment', 'prop-types', 'react', 'react-dom', 'react-leaflet',
      'react-redux', 'redux', 'universal-cookie',
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].bundle.js',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.[hash].css',
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
    }),
    new BundleTracker({filename: './webpack-stats.json'}),
    new CleanWebpackPlugin([
      BUILD_DIR,
    ], {
      exclude: ['.gitkeep'],
      verbose: true,
      dry: false,
      watch: false,
      allowExternal: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-2', 'react'],
          plugins: [
            'transform-object-rest-spread', 'transform-class-properties',
          ],
        },
      },
      {
        test: /\.scss$/,
        include: APP_DIR,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
      },
    ],
  },
}

module.exports = config
