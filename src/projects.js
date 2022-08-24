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
    const res = await db('projects').where('api_public_key', key).limit(1)

    if (!res || !res.length) {
      console.warn(`Failed to find project by '${key}'`);
      return;
    }

    cache.set(key, res[0]);

    return res[0];
  } catch (err) {
    console.error(`Failed to fetch the project by '${key}'`, err);
  }
}

module.exports = {
  fetchProjectByKey
}
