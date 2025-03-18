const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = {
  webpack: {
    configure: (config) => {
      config.output.publicPath = 'auto'
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'basket',
          filename: 'remoteEntry.js',
          exposes: {
            './Basket': './src/components/Basket',
            './basketSlice': './src/store/basketSlice',
          },
          shared: {
            ...deps,
            react: {
              singleton: true,
              eager: true,
              requiredVersion: deps.react
            },
            'react-dom': {
              singleton: true,
              eager: true,
              requiredVersion: deps['react-dom']
            },
            '@reduxjs/toolkit': {
              singleton: true,
              eager: true,
              requiredVersion: deps['@reduxjs/toolkit']
            },
            'react-redux': {
              singleton: true,
              eager: true,
              requiredVersion: deps['react-redux']
            },
            antd: {
              singleton: true,
              eager: true,
              requiredVersion: deps.antd
            },
          },
        })
      )
      return config
    },
  },
}