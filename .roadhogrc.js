const path = require('path')

export default {
  'entry': 'src/index.js',
  'disableCSSModules': true,
  'theme': './theme.config.js',
  'env': {
    'development': {
      'extraBabelPlugins': [
        'dva-hmr',
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4'
        ]
      }
    },
    'production': {
      'publicPath': 'http://ou77rcnh8.bkt.clouddn.com/nuedc-fe/',
      'extraBabelPlugins': [
        'transform-runtime',
        'transform-decorators-legacy',
        ['import', {'libraryName': 'antd', 'style': true}]
      ],
      'autoprefixer': {
        'browsers': [
          'iOS >= 8', 'Android >= 4', 'ie >=9'
        ]
      },
      "define": {
        "__CDN__": "http://ou77rcnh8.bkt.clouddn.com/nuedc-fe/"
      }
    }
  }
}
