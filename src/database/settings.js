const SQL = require('sql-template-strings');
const getDb = require('./');

module.exports = async () => {
  const db = await getDb();

  const operations = {
    async set(key, value) {
      if (!(await operations.get(key))) {
        return db.run(SQL`INSERT INTO settings (k, v) VALUES (${key}, ${value})`);
      }

      return db.run(SQL`UPDATE settings SET v = ${value} WHERE k = ${key}`);
    },
    async get(key) {
      return db.get(SQL`SELECT * FROM settings WHERE k = ${key}`);
    },
  };

  return operations;
};
