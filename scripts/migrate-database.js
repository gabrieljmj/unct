/**
 * Executes the migrations
 */
(async () => {
  const db = await require('../src/database')();

  await db.migrate({ force: 'last' });
})();
