const SQL = require('sql-template-strings');
const getDb = require('./');

module.exports = async () => {
  const db = await getDb();

  return {
    async create(project) {
      return db.run(SQL`INSERT INTO projects (project) VALUES (${project})`);
    },
    async getAll() {
      return db.all(SQL`SELECT * FROM projects ORDER BY project ASC`);
    },
    async getAllFromDir(dir) {
      return db.all(`SELECT * FROM projects WHERE project LIKE '${dir}%'`);
    },
    async get(project) {
      return db.get(SQL`SELECT * FROM projects WHERE project = ${project}`);
    },
    async delete(project) {
      return db.run(SQL`DELETE FROM projects WHERE project = ${project}`);
    },
  };
};
