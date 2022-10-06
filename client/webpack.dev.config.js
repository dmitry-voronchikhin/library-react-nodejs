const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const styleLoaders = (extra) => {
  const loaders = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 0,
        modules: {
          localIdentName: '[local]__[hash:base64:5]',
          auto: true,
        },
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const config = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(css)$/,
        use: styleLoaders(),
      },
      {
        test: /\.(s[ac]ss)$/,
        use: styleLoaders('sass-loader'),
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@api': path.resolve(__dirname, 'src/app/api/'),
      '@components': path.resolve(__dirname, 'src/app/components/'),
      '@constants': path.resolve(__dirname, 'src/app/constants/'),
      '@store': path.resolve(__dirname, 'src/app/store/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

module.exports = config;
