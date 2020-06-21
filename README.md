Pluris
======

Extra prototypes and utilities for the [Eris](https://npmjs.com/package/eris) Discord API Library

Warning
-------
This package is currently under development. There will be frequent updates. Please do not expect the package to work if you install it.

---
Installation and Usage
----------------------
You will need to have at least Eris v0.13.3 installed. Previous versions of Eris will not be tested for compatibility. You must also make sure that other packages do not conflict with Pluris.

```sh
$ npm i bsian03/pluris
```
After installing Pluris, make sure you initialise Eris with Pluris
```js
const Eris = require('eris');
require('pluris')(Eris);
```
You will only need to do this once, preferably in your main bot file. To disable specific plugins, supply an object in the second parameter with the plugin name set to false. See below for a list of available plugins
```js
const Eris = require('eris');
require('pluris')(Eris, { awaitMessages: false });
```
Setting the plugin to `true` will keep the plugin enabled

Plugins
-------
- [awaitMessages](docs/awaitMessages)
- [awaitReactions](docs/awaitReactions)

TypeScript
----------
This package includes some documentation updates for Eris. Due to limitations within TypeScript, only definitions for class declarations have been included, class prototypes have not been documented in TypeScript. Once TypeScript allows for prototype additions in module augmentations, they will be included in this package.

However, you will still be able to use those methods. You may add `// @ts-expect-error` or `// @ts-ignore` above the relevant line to allow tsc to transpile the file without errors.

License
-------
Please see the [license](LICENSE) file. 
