Pluris
======

Extra prototypes and utilities for the [Eris](https://npmjs.com/package/eris) Discord API Library

---
Installation and Usage
----------------------
You will need to have at least Eris v0.13.3 installed. Previous versions of Eris will not be tested for compatibility. You must also make sure that other packages do not conflict with Pluris.

```sh
$ npm i pluris
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
- [awaitMessages](docs/awaitMessages.md)
- [awaitReactions](docs/awaitReactions.md)
- [createDMMessage](docs/createDMMessage.md)
- [embed](docs/embed.md)
- [endpoints](docs/endpoints.md)
- [messageGuild](docs/messageGuild.md)

(In case I've missed some plugins from this list, you can see the [docs](docs/) folder for available plugins)

TypeScript
----------
This package includes some documentation updates for Eris. I have tried to overwrite the typings as best as I can, however if there are any errors or issues, please let me know.

License
-------
Please see the [license](LICENSE) file. 
