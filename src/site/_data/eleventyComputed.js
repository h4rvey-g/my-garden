const { getGraph } = require("../../helpers/linkUtils");
const { getFileTree } = require("../../helpers/filetreeUtils");
const { userComputed } = require("../../helpers/userUtils");
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = {
  graph: async (data) => {
    // We use the number of notes as a simple cache key.
    // This is an effective way to bust the cache when content changes.
    const noteCount = data.collections.note ? data.collections.note.length : 0;
    const cacheKey = `graph-cache-${noteCount}`;

    return EleventyFetch(
      async () => {
        return getGraph(data);
      },
      {
        duration: "1d",
        type: "json",
        key: cacheKey,
      }
    );
  },
  filetree: (data) => getFileTree(data),
  userComputed: (data) => userComputed(data),
};
