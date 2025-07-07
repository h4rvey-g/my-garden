module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      if (data.permalink) {
        // The permalink might be an object (from a directory data file) or a string (from front matter)
        const permalinkValue = typeof data.permalink === 'object' ? data.permalink.toString() : data.permalink;

        if (typeof permalinkValue === 'string') {
            // Split the path into segments, filtering out empty strings from leading/trailing slashes
            const parts = permalinkValue.split('/').filter(part => part);
            // Encode each part and join them back with slashes
            const encodedPermalink = parts.map(part => encodeURIComponent(part)).join('/');
            // Add leading and trailing slashes back
            return `/${encodedPermalink}/`;
        }
      }
      // If no permalink is set in the front matter, return undefined to let Eleventy use its default logic
      return undefined;
    },
  },
};
