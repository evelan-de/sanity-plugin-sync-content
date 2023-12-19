# Sanity Plugin Sync Content

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-sync-content
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {syncContentPlugin} from 'sanity-plugin-sync-content'

export default defineConfig({
  //...
  plugins: [
    // ...other plugins
    syncContentPlugin()
  ],
})
```

Just add directly the defineField for copyPaste directly into any of your referenced block array like so:

```ts
import {defineConfig} from 'sanity'
import {copyPaste} from 'sanity-plugin-sync-content'

export default defineType({
  name: "my-section",
  title: "My Example Section",
  type: "object",
  fields: [
    copyPaste,
    // ...your-other-fields
  ]
})
```

## Overriding copyPaste field configuration

You can override some of the configuration for the copyPaste field like so:

```ts
export default defineType({
  name: "my-section",
  title: "My Example Section",
  type: "object",
  fields: [
    {
      ...copyPaste,
      title: "The New Copy Paste Title",
      hidden: () => {
        // Some logic

        return true;
      },
      // ...other configurations
    },
    // ...your-other-fields
  ]
})
```

## License

[MIT](LICENSE) © Evelan

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
