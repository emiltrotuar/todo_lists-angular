module.exports = function(config) {
  config.set({
    files: [
      'spec/**/*.coffee'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'spec/**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    }
  });
};
