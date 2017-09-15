'use strict'

module.exports = {
  port: 4000,
  title: 'Stuck: Your last played tracks',
  // When you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/',
  // Disable babelrc by default
  babel: {
    babelrc: false,
    presets: ['vue-app'],
  },
  postcss: [
    // Add prefix via postcss since it's faster
    require('autoprefixer')({
      // Vue does not support ie 8 and below
      browsers: ['last 2 versions', 'ie > 8'],
    }),
    require('postcss-nested'),
    require('postcss-utilities')(),
    require('postcss-custom-media')({
      extensions: {
        '--phone': '(min-width: 544px)',
        '--tablet': '(min-width: 768px)',
        '--max': '(min-width: 1024px)',
        '--desktop': '(min-width: 992px)',
        '--large-desktop': '(min-width: 1200px)',
      },
    }),
  ],
  cssModules: true,
}
