const program = require('commander');

const commands = require('./src/commands');
const { importCommands } = require('./src/services/commands');
const { version } = require('./package.json');

program.version(version);

importCommands(program, commands);

program.parse(process.argv);
