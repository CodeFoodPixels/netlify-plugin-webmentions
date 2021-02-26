# Netlify Build Plugin: Automatically discover any webmentions and send them after every production build

Automatically discover any webmentions and send them after every production build.

This plugin will send webmentions to any mentioned websites that have a webmention endpoint after every production build. The plugin can be used without any configuration if using the defaults.

## Usage
There are a couple of ways to install this plugin

### UI based installation
You can install this plugin in the Netlify UI from this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-webmentions/install) or from the [Plugins directory](https://app.netlify.com/plugins).

If you do it this way, you will need to do any configuration using [Build environment variables](https://docs.netlify.com/configure-builds/environment-variables/).

The variables used are:
- `WEBMENTION_BASE_URL`: The base url of your site (optional, default: main URL set in Netlify)
- `WEBMENTION_FEED_PATH`: Path to the feed URL (optional, default: /feed.xml)
- `WEBMENTION_LIMIT`: Maximum number of feed entries to check for mentions (optional, default: 1)

### File based installation
To use file based installation, add this package to your `devDependencies`: 

```
npm install -D netlify-plugin-webmentions
```

Then add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
  package = "netlify-plugin-webmentions"

	[plugins.inputs]

	# The base url of your site (optional, default: main URL set in Netlify)
	baseUrl = "https://example.com"

	# Path to the feed URL (optional, default: /feed.xml)
	feedPath = "/feed.xml"

	# Maximum number of feed entries to check for mentions (optional, default: 1)
	limit = 1
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.


