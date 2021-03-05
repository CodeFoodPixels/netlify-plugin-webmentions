const Webmention = require("@remy/webmention");
const {
  CONTEXT,
  URL,
  WEBMENTION_LIMIT,
  WEBMENTION_FEED_PATH,
  WEBMENTION_BASE_URL,
} = process.env;

module.exports = {
  async onSuccess({ utils, constants, inputs }) {
    const limit = inputs.limit || WEBMENTION_LIMIT || 1;
    const feedPath = inputs.feedPath || WEBMENTION_FEED_PATH || "feed.xml";
    const baseUrl = inputs.baseUrl || WEBMENTION_BASE_URL || URL;
    const feedUrl = `${baseUrl.replace(/\$/, "")}/${feedPath}`;

    if (constants.IS_LOCAL || CONTEXT !== "production") {
      console.log(
        "Skipping discovering webmentions because this isn't a production build"
      );
      return;
    }

    try {
      await new Promise((resolve, reject) => {
        console.log(
          `Discovering Webmentions in ${feedUrl} with a limit of ${limit} ${
            limit === 1 ? "entry" : "entries"
          }`
        );
        console.log("");

        const wm = new Webmention({ limit, send: true });

        wm.on("error", (e) => reject(e));

        wm.on("sent", (res) => {
          console.log(
            `Sent ${res.source} to ${res.endpoint.url} (${res.endpoint.type})`
          );
          if (res.error) {
            console.log(`Error sending to ${res.endpoint.url}: ${res.error}`);
          }
          console.log("");
        });

        wm.on("end", () => {
          resolve();
        });

        wm.fetch(feedUrl);
      });
    } catch (e) {
      utils.build.failPlugin(e);
    }
  },
};
