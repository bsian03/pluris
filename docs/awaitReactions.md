
# awaitReactions
Reaction collector for messages. Includes a ReactionCollector class. Thanks [Riya](https://github.com/riyacchi/) for letting me ~~hack~~ use [eris-reactions](https://github.com/riyacchi/eris-reactions) in Pluris!

## message.awaitReactions(options);
> | Parameter         | Type     | Default          | Description                                                                                                                |
> |-------------------|----------|------------------|----------------------------------------------------------------------------------------------------------------------------|
> | [options]         | Object   | {}               | Reaction Collector options                                                                                                 |
> | [options.timeout] | Number   | 10000            | Length in milliseconds before the collector ends automatically. Set this and count to 0 for continous/permanent collection |
> | [options.count]   | Number   | 10               | Maximum number of reactions to collect. Set this and timeout to 0 for continous/permanent collection                       |
> | [options.filter]  | Function | (userID) => true | A function to check whether the reaction is valid or not                                                                   |
>
> Returns `Promise<ReactionCollector>` - See below for use

## client.awaitMessageReactions(message, options);
> | Parameter         | Type     | Default          | Description                                  |
> |-------------------|----------|------------------|----------------------------------------------|
> | message           | Message  |                  | Message the reaction collector should run on |
> | [options]         | Object   | {}               | See above                                    |
>
> Returns `Promise<ReactionCollector>` - See below for use

## Class: ReactionCollector
### Constructor `new Eris.ReactionCollector(message, options);`
> | Parameter | Type    | Default | Description                                  |
> |-----------|---------|---------|----------------------------------------------|
> | message   | Message |         | Message the reaction collector should run on |
> | [options] | Object  | {}      | See above                                    |

### Properties
> | Property  | Type             | Description                                                    |
> |-----------|------------------|----------------------------------------------------------------|
> | message   | Message          | Message the reaction collector should run on                   |
> | timeout   | Number           | Length in milliseconds before the collector ends automatically |
> | count     | Number           | Maximum number of reactions to collect                         |
> | collected | Array\<Object>   | Reactions collected                                            |
> | running   | Boolean          | Whether the collector is running or not                        |
> | handler   | ReactionHandler? | [Reaction Handler](https://github.com/riyacchi/eris-reactions) |

### Functions
#### filter(userID)
> A filter to check whether the reaction is valid or not
> | Parameter | Type   | Default | Description               |
> |-----------|--------|---------|---------------------------|
> | userID    | String |         | User ID to check if valid |
>
> Returns `Boolean`

#### run()
> Start collecting reactions
>
> Returns `Promise<ReactionCollector>`

#### stop()
> Stop collecting reactions
>
> Returns `void`

### Events
#### collect
> Fired when a reaction has been collected
> | Parameter | Type    | Description                               |
> |-----------|---------|-------------------------------------------|
> | reaction  | Object  | Reaction that was added to the collection |

#### stop
> Fired when the collector has finished
