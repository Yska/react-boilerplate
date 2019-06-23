const { babelrc } = require('dm-bundler')

const config = Object.assign({}, babelrc, {
  plugins: [
    ['transform-imports', {
      'lodash': {
        'transform': 'lodash/${member}',
        'preventFullImport': true
      }
    }],
    ['transform-react-pug', {
      classAttribute: 'styleName'
    }],
    ['react-pug-classnames', {
      classAttribute: 'styleName'
    }]
  ].concat(babelrc.plugins)
})

config.env.development.plugins = [
  ['flow-react-proptypes', {ignoreNodeModules: true}]
].concat(config.env.development.plugins)

config.env.web_development.plugins = [
  ['flow-react-proptypes', {ignoreNodeModules: true}]
].concat(config.env.web_development.plugins)

module.exports = config
