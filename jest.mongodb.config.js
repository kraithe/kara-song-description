module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'songDescriptions'
    },
    binary: {
      version: '4.0.3',
      skipMD5: true
    },
    autoStart: false
  }
};