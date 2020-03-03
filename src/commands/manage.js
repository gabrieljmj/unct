/**
 * Listar todos as pastas do atual caminho
 */

const { prompt } = require('inquirer');
const { getProjectsDirectory, getDirectories } = require('../utils');

module.exports = {
  name: 'manage',
  description: 'Manage projects.',
  options: [
    {
      flags: '-p, --projects',
      description: 'List only projects from directories list.',
    },
  ],
  async action(cmdObj) {
    const directory = await getProjectsDirectory();

    if (!directory) {
      console.error('Directory was not set. Run command \'vsp config dir\'.');

      return false;
    }

    const projectsDb = await require('../database/projects')();
    const dir = await getProjectsDirectory();
    const projects = (await projectsDb.getAll()).map(({ project }) => project);

    let directories = await getDirectories(dir);

    if (cmdObj.projects) {
      directories = directories.filter((directoryName) => projects.includes(directoryName));
    }

    const choices = await prompt([
      {
        type: 'checkbox',
        name: 'directories',
        message: 'What directories do you want to add to projects list?\n',
        choices: directories,
        default: projects,
        prefix: '',
      },
    ]);

    choices.directories.forEach(async (directoryName) => {
      if (directoryName && !(await projectsDb.get(directoryName))) {
        await projectsDb.create(directoryName);
      }
    });

    projects.forEach(async (project) => {
      if (!choices.directories.includes(project)) {
        await projectsDb.delete(project);
      }
    });
  },
};
