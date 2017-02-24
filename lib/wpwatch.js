'use strict';

const BbPromise = require('bluebird');
const webpack = require('webpack');

module.exports = {
  wpwatch() {
    this.serverless.cli.log('Watching with Webpack...');

    const compiler = webpack(this.webpackConfig);
    let finishedOneRun = false;
    return new BdPromise((resolve, reject) => {
      compiler.watch({}, (err, stats) => {
          if (err) {
            reject(err);
          }
          if (!finishedOneRun) {
            resolve();
          }
          finishedOneRun = true;

          if (stats) {
              console.log("Webpack rebuilt");
          }
        });

    });
  },
};
