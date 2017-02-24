'use strict';

const BbPromise = require('bluebird');
const webpack = require('webpack');

module.exports = {
  wpwatch() {
    this.serverless.cli.log('Watching with Webpack...');

    const compiler = webpack(this.webpackConfig);
    compiler.watch({}, (err, stats) => {
        if (err || (stats && stats.hasErrors())) {
          throw new Error("Error compiling webpack")
        }
        if (stats && !stats.hasWarnings()) {
          this.serverless.cli.log('Webpack rebuilt with no problems');
        } else {
          this.serverless.cli.log(`Webpack rebuilt with ${stats.compilation.warnings.length} warnings`);
        }
      });

    return BbPromise.resolve();
  },
};
