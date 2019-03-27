const { readdir } = require('fs');
const { parse } = require('path');

/**
 * Load all routes in all files from the `routes` folder.
 *
 * Each routes file will receive a reference to the expressJS
 * sub-application in the `app` variable, so the file can use this
 * reference to register the routes that will be exposed in the OCC
 * extension server.
 */
const loadRoutes = app => {
  return new Promise((resolve, reject) => {
    readdir(__dirname, (err, files) => {
      if (err) {
        reject(err);
      }

      Promise.all(
        files
          .map(routeFullFileName => parse(routeFullFileName).name) // get only the file name, without the extension
          .filter(routeFileName => routeFileName !== 'index') // ignore this file
          .map(routeFileName => {
            return new Promise((resolve, reject) => {
              try {
                require(`./${routeFileName}`)(app);
                resolve();
              } catch (e) {
                reject(e);
              }
            });
          })
      ).then(resolve).catch(reject);
    });
  });
};

module.exports = loadRoutes;
