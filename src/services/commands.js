function importCommand(program, command) {
  const programCommand = program.command(command.name);

  if (command.description) {
    programCommand.description(command.description);
  }

  if (command.action) {
    programCommand.action(command.action);
  }

  if (command.options) {
    command.options.forEach(({ flags, description, defaultValue }) => {
      programCommand.option(flags, description || null, defaultValue || null);
    });
  }
}

function importCommands(program, commands) {
  Object.values(commands).forEach((command) => importCommand(program, command));
}

module.exports.importCommand = importCommand;

module.exports.importCommands = importCommands;
