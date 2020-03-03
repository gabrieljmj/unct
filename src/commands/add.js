const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { getProjectsDirectory } = require('../utils');

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

module.exports = {
  name: 'add <project>',
  description: 'Add a project.',
  options: [
    {
      flags: '-c, --create',
      description: 'Creates the project directory if it does not exists.',
    },
  ],
  async action(project, { create }) {
    const projectsDirectory = await getProjectsDirectory();

    if (!projectsDirectory) {
      console.error('Directory was not set. Run command \'vsp config dir\'.');

      return false;
    }

    const projectPath = path.resolve(projectsDirectory, project);
    let projectDirectoryExists = true;

    try {
      const dirStat = await stat(projectPath);
      projectDirectoryExists = projectDirectoryExists ? dirStat.isDirectory() : false;
    } catch ({ code }) {
      if (code === 'ENOENT') {
        projectDirectoryExists = false;
      }
    }

    if (create) {
      if (!projectDirectoryExists) {
        await mkdir(projectPath);

        console.log('Directory created sucessfully!');

        projectDirectoryExists = true;
      }
    }

    if (!projectDirectoryExists) {
      console.error('Project directory does not exists. Use the flag \'-c\' to create it.');

      return;
    }

    const projectsDb = await require('../database/projects')();
    const isAProject = await projectsDb.get(project);

    if (!isAProject) {
      await projectsDb.create(project);
      console.log('Project added.');
    } else {
      console.log('Project not added: already a project.');
    }
  },
};
