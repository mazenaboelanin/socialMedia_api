const RBAC = require('easy-rbac');
const options = require('./policy/index');
const rbac = RBAC.create(options);

module.exports = rbac;