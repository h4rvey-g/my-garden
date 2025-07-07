const settings = require("../../helpers/constants");

require("dotenv").config();

const allSettings = settings.ALL_NOTE_SETTINGS;

module.exports = {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    permalink: (data) => {
      // Handle the homepage (gardenEntry) first
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }

      // Handle other notes that have a permalink
      if (data.permalink) {
        const permalinkValue =
          typeof data.permalink === "object"
            ? data.permalink.toString()
            : data.permalink;

        if (typeof permalinkValue === "string") {
          // Split the path into segments, filtering out empty strings from leading/trailing slashes
          const parts = permalinkValue.split("/").filter((part) => part);
          // Encode each part and join them back with slashes
          const encodedPermalink = parts
            .map((part) => encodeURIComponent(part))
            .join("/");
          // Add leading and trailing slashes back
          return `/${encodedPermalink}/`;
        }
      }

      // If no permalink, let Eleventy decide.
      return undefined;
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting || (globalSetting === "true" && noteSetting !== false);
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
  },
};
