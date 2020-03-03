const sqlite = require('sqlite');
const { storage } = require('../config/database');

module.exports = async () => sqlite.open(storage, { Promise });
