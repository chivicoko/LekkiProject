const session = require('express-session');
const Keycloak = require('keycloak-connect');
const chalk = require('chalk');






const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });


module.exports = {keycloak, memoryStore};