const nconf = require('nconf');

/**
 * This is an helper to get configurations from OCC
 * server-side extension server.
 */
module.exports = {
  getCustomVariable(name) {
    return process.env[name];
  },
  getAdminUrl() {
    return nconf.get('atg.server.admin.url');
  },
  getAgentUrl() {
   return nconf.get('atg.server.agent.url');
  },
  getStoreUrl() {
   return nconf.get('atg.server.url');
  },
  getAdminToken() {
    return nconf.get('atg.application.credentials:atg.application.token');
  }
};
