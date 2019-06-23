const merge = require('lodash/merge')
const { webpackServerConfig } = require('dm-bundler')
const path = require('path')

module.exports = merge({}, webpackServerConfig, {
  resolve: {
    alias: {
      lib: path.join(__dirname, 'lib')
    }
  }
})
