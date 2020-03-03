const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

module.exports.getProjectsDirectory = async function getProjectsDirectory() {
  const db = await require('./database/settings')();
  const dir = await db.get('directory');

  if (!dir) {
    return false;
  }

  return dir.v;
};

module.exports.getDirectories = async function getDirectories(src) {
  const dirs = await readdir(src, { withFileTypes: true });

  return dirs.filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};
