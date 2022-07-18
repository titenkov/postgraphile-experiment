const db = require('./db');
const NodeCache = require("node-cache");

// Projects will never be changed, so can be set to infinite?
const cache = new NodeCache({ stdTTL: 3600 });

async function fetchProjectByKey(key) {
  if (!key) {
    throw new Error('key is required');
  }

  // Check if there is a project already in cache
  if (cache.has(key)) {
    return cache.get(key);
  }

  console.log(`[projects-db] Fetching by key '${key}'`);

  try {
    const res = await db.query(
      'SELECT * FROM projects WHERE api_public_key = $1',
      [key]
    );

    if (!res || res.length === 0) {
      console.warn(`Failed to find project by '${key}'`);
      return;
    }

    // Project is found, so put it in cache
    cache.set(key, res[0]);

    return res[0];
  } catch (err) {
    console.error(`Failed to fetch the project ${err}`);
    return;
  }

}

module.exports = {
  fetchProjectByKey
}