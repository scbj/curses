module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap(([ definition, ...rest ]) => {
      const version = JSON.stringify(require('./package.json').version)
      definition['process.env']['VUE_APP_VERSION'] = version
      return [ definition, ...rest ]
    })
  }
}
