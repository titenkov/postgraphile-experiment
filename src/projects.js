const { db } = require('./db');
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
    const project = await db.one('SELECT * FROM projects WHERE api_public_key = $1 LIMIT 1', [key]);
    cache.set(key, project);

    return project;
  } catch (err) {
    console.error(`Failed to fetch the project by '${key}'`, err);
  }
}

module.exports = {
  fetchProjectByKey
}
