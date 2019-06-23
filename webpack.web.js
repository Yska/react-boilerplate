const merge = require('lodash/merge')
const { webpackWebConfig, getJsxRule } = require('dm-bundler')
const path = require('path')
const BUNDLE_NAME = 'main'
const FORCE_COMPILE_MODULES = []

module.exports = merge({}, webpackWebConfig, {
  entry: {
    [BUNDLE_NAME]: ['@babel/polyfill', './index.js']
  },
  resolve: {
    alias: {
      hooks: path.join(__dirname, 'hooks'),
      lib: path.join(__dirname, 'lib')
    }
  },
  module: {
    rules: webpackWebConfig.module.rules.concat([
      Object.assign(getJsxRule(), {
        include:
          new RegExp(`node_modules/(?:${FORCE_COMPILE_MODULES.join('|')})`)
      })
    ])
  }
})
