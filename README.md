# Sanity Plugin Sync Content

A Sanity plugin for copy and pasting referenced blocks in array type of fields in Sanity Studio. Based on [sanity-plugin-copy-paste](https://github.com/superside-oss/sanity-copy-paste), but was configured to fit the use cases of our projects needs.

> This is a **Sanity Studio v3** plugin.

- [Sanity Plugin Sync Content](#sanity-plugin-sync-content)
  - [🔌 Installation](#-installation)
  - [🧑‍💻 Usage](#-usage)
  - [📃 Overriding copyPaste field configuration](#-overriding-copypaste-field-configuration)
  - [🌐 Localization](#-localization)
      - [Available locales to be overriden](#available-locales-to-be-overriden)
  - [📝 License](#-license)
  - [🧪 Develop \& test](#-develop--test)
    - [Release new version](#release-new-version)

## 🔌 Installation

```sh
npm install sanity-plugin-sync-content
```

## 🧑‍💻 Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import { defineConfig } from 'sanity';
import { syncContentPlugin } from 'sanity-plugin-sync-content';

export default defineConfig({
  //...
  plugins: [
    // ...other plugins
    syncContentPlugin(),
  ],
});
```

Just add directly the defineField for copyPaste directly into any of your referenced block array like so:

```ts
import { defineConfig } from 'sanity';
import { copyPaste } from 'sanity-plugin-sync-content';

export default defineType({
  name: 'my-section',
  title: 'My Example Section',
  type: 'object',
  fields: [
    copyPaste,
    // ...your-other-fields
  ],
});
```

## 📃 Overriding copyPaste field configuration

You can override some of the configuration for the copyPaste field like so:

```ts
export default defineType({
  name: 'my-section',
  title: 'My Example Section',
  type: 'object',
  fields: [
    {
      ...copyPaste,
      title: 'The New Copy Paste Title',
      hidden: () => {
        // Some logic

        return true;
      },
      // ...other configurations
    },
    // ...your-other-fields
  ],
});
```

## 🌐 Localization

This plugin uses the [Studio UI Localization](https://www.sanity.io/docs/localizing-studio-ui) resource bundle, it is now possible to localize the fields to fit your needs.

**Here is the default English bundle:**
<br />

<details>
  <summary>Default bundle</summary>
<br />

```ts
{
  // Title of the schema field
  'schema.title': 'Copy/paste the item',

  // Toast
  'toast.success.copy.title': 'Copied successfully',
  'toast.success.paste.title': 'Pasted successfully',
  'toast.success.duplicate.title':
    'Duplicated to {{pageCount}} pages successfully',
  'toast.warning.duplicate.title':
    'Duplicated to {{pageCount}} pages with some warnings',
  'toast.error.title': 'Something went wrong',

  // Dialog
  'dialog.header.title': 'Duplicate to multiple pages',
  'dialog.checkbox.form.title': 'Ordered by update date',
  'dialog.deselect.title': 'Deselect all',
  'dialog.pasting.title': 'Duplicating to selected pages...',
  'dialog.paste.title': 'Duplicate the block to selected pages',
  'dialog.loading.title': 'Loading some content…',

  // Buttons
  'button.duplicate.title': 'Duplicate to multiple pages',
  'button.copy.title': 'Copy',
  'button.paste.title': 'Paste',
  'button.pasting.title': 'Pasting...',
}
```

</details>
<br/>

#### Available locales to be overriden

- `en-US`
- `de-DE`

If you want to override or add a new language, you will need to create a custom bundle with your desired translations. In order to override/add you must use `sanity-plugin-sync-content` as the namespace and add it to the `i18n` object in your sanity plugin configuration. Here is an example:

```ts
const myEnglishOverride = defineLocaleResourceBundle({
  // make sure the `locale` language code corresponds to the one you want to override
  locale: 'en-US',
  namespace: 'sanity-plugin-sync-content',
  resources: {
    'button.copy.title': 'My custom Copy title',
  },
});

// sanity.config.ts
export default defineConfig({
  // ...
  i18n: {
    bundles: [myEnglishOverride],
  },
});
```

## 📝 License

[MIT](LICENSE) © Evelan

## 🧪 Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/evelan-de/sanity-plugin-sync-content/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
