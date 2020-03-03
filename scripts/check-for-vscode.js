const processChild = require('child_process');
const { promisify } = require('util');

const exec = promisify(processChild.exec);

(async () => {
  try {
    const { stderr } = await exec('which code');

    if (stderr !== '') {
      console.log('No VS Code installation found. Maybe it is not on PATH.');
    }
  } catch (e) {
    console.log('No VS Code installation found. Maybe it is not on PATH.');
  }
})();
