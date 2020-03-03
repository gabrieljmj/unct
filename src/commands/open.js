const { exec } = require('child_process');
const path = require('path');
const { prompt } = require('inquirer');
const { getProjectsDirectory } = require('../utils');

module.exports = {
  name: 'open [project]',
  description: 'Opens a VS Code project.',
  async action(project) {
    const directory = await getProjectsDirectory();

    if (!directory) {
      console.error('Directory was not set. Run command \'vsp config dir\'.');

      return false;
    }

    const openProject = async (_project) => {
      const absolutePath = path.resolve(directory, _project);

      console.log(`Opening project ${_project}...`);

      exec(`code ${absolutePath}`);
    };

    if (project) {
      openProject(project);

      return;
    }

    const projectsDb = await require('../database/projects')();
    const projects = (await projectsDb.getAll()).map(({ project: p }) => p);

    if (!projects.length) {
      console.error('No projects found.');
      return;
    }

    const choosenProject = await prompt([
      {
        type: 'list',
        name: 'project',
        message: 'What project do you want to open?\n',
        choices: projects,
        prefix: '',
      },
    ]);

    await openProject(choosenProject.project);
  },
};
