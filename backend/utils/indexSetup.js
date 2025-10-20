const { client, dbName } = require('../config/db');

const ensureUserIndex = async () => {
  try {
    const db = client.db(dbName);
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('✅ users collection index ready');
  } catch (err) {
    console.error('❌ Could not create users index:', err.message);
  }
};

module.exports = { ensureUserIndex };
