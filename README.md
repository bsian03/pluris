Pluris
===

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

# Plugins
## awaitMessages
Message Collector for all textable channels. Includes a MessageCollector class

### channel.awaitMessages(options);
> | Parameter         | Type     | Default       | Description                                                                 |
> |-------------------|----------|---------------|-----------------------------------------------------------------------------|
> | [options]         | Object   | {}            | Message Collector options                                                   |
> | [options.timeout] | Number   | 10000         | Length in milliseconds before the collector ends automatically              |
> | [options.count]   | Number   | 10            | Maximum number of messages to collect. Set to 0 to collect as many messages |
> | [options.filter]  | Function | (msg) => true | A filter to check whether the message is valid or not                       |
>
> Returns `Promise<MessageCollector>` - See below for use

### client.awaitChannelMessages(channel, options);
> | Parameter | Type            | Default | Description                                      |
> |-----------|-----------------|---------|--------------------------------------------------|
> | channel   | TextableChannel |         | Text channel the message collector should run in |
> | [options] | Object          | {}      | See above                                        |
>
> Returns `Promise<MessageCollector>` - See below for use

### Class: MessageCollector
#### Constructor `new Eris.MessageCollector(channel, options);`
> | Parameter | Type            | Default | Description                                      |
> |-----------|-----------------|---------|--------------------------------------------------|
> | channel   | TextableChannel |         | Text channel the message collector should run in |
> | [options] | Object          | {}      | See above                                        |

#### Properties
> | Property   | Type                 | Description                                                    |
> |------------|----------------------|----------------------------------------------------------------|
> | channel    | TextableChannel      | Channel the message collector is running in                    |
> | timeout    | Number               | Length in milliseconds before the collector ends automatically |
> | count      | Number               | Maximum number of messages to collect                          |
> | collected  | Collection\<Message> | Messages collected                                             |
> | running    | Boolean              | Whether the collector is running or not                        |

#### Functions
- filter(msg)
> A filter to check whether the message is valid or not
> | Parameter | Type    | Default | Description               |
> |-----------|---------|---------|---------------------------|
> | msg       | Message |         | Message to check if valid |
>
> Returns `Boolean`

- run()
> Start collecting messages
>
> Returns `Promise<MessageCollector>`

- stop()
> Stop collecting messages
>
> Returns `void`

#### Events
- collect
> Fired when a message has been collected
> | Parameter | Type    | Description                              |
> |-----------|---------|------------------------------------------|
> | msg       | Message | Message that was added to the collection |

- update
> Fired when a message in the collection has been updated
> | Parameter | Type    | Description                                |
> |-----------|---------|--------------------------------------------|
> | msg       | Message | Message that was updated in the collection |

- delete
> Fired when a message in the collection has been deleted
> | Parameter | Type    | Description                                  |
> |-----------|---------|----------------------------------------------|
> | msg       | Message | Message that was deleted from the collection |

- stop
> Fired when the collector has finished

## awaitReactions
Reaction collector for messages. Includes a ReactionCollector class. Thanks [Riya](https://github.com/riyacchi/) for letting me ~~hack~~ use [eris-reactions](https://github.com/riyacchi/eris-reactions) in Pluris!

### message.awaitReactions(options);
> | Parameter | Type     | Default          | Description                                                                                                                |
> |-----------|----------|------------------|----------------------------------------------------------------------------------------------------------------------------|
> | timeout   | Number   | 10000            | Length in milliseconds before the collector ends automatically. Set this and count to 0 for continous/permanent collection |
> | count     | Number   | 10               | Maximum number of reactions to collect. Set this and timeout to 0 for continous/permanent collection                       |
> | filter    | Function | (userID) => true | A function to check whether the reaction is valid or not                                                                   |
>
> Returns `Promise<ReactionCollector>` - See below for use

### Class: ReactionCollector
#### Constructor `new Eris.ReactionCollector(message, options);`
> | Parameter | Type    | Default | Description                                  |
> |-----------|---------|---------|----------------------------------------------|
> | message   | Message |         | Message the reaction collector should run on |
> | [options] | Object  | {}      | See above                                    |

#### Properties
> | Property  | Type             | Description                                                    |
> |-----------|------------------|----------------------------------------------------------------|
> | message   | Message          | Message the reaction collector should run on                   |
> | timeout   | Number           | Length in milliseconds before the collector ends automatically |
> | count     | Number           | Maximum number of reactions to collect                         |
> | collected | Array\<Object>   | Reactions collected                                            |
> | running   | Boolean          | Whether the collector is running or not                        |
> | handler   | ReactionHandler? | [Reaction Handler](https://github.com/riyacchi/eris-reactions) |

#### Functions
- filter(userID)
> A filter to check whether the reaction is valid or not
> | Parameter | Type   | Default | Description               |
> |-----------|--------|---------|---------------------------|
> | userID    | String |         | User ID to check if valid |
>
> Returns `Boolean`

- run()
> Start collecting reactions
>
> Returns `Promise<ReactionCollector>`

- stop()
> Stop collecting reactions
>
> Returns `void`

#### Events
- collect
> Fired when a reaction has been collected
> | Parameter | Type    | Description                               |
> |-----------|---------|-------------------------------------------|
> | reaction  | Object  | Reaction that was added to the collection |

- stop
> Fired when the collector has finished

# TypeScript
This package includes and updates TypeScript documentation for Eris. There may be some compatibility issues when the Eris documentation gets updated.

# License
Please see the [license](LICENSE) file. 
