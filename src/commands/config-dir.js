module.exports = {
  name: 'config <type> [args...]',
  async action(type, args) {
    if (type === 'dir') {
      const settingsDb = await require('../database/settings')();
      const directory = args[0] ? args[0] : process.cwd();

      await settingsDb.set('directory', directory);

      console.log(`Projects directory changed to ${directory}`);
    }
  },
};
