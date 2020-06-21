
# awaitMessages
Message Collector for all textable channels. Includes a MessageCollector class

## channel.awaitMessages(options);
> | Parameter         | Type     | Default       | Description                                                                 |
> |-------------------|----------|---------------|-----------------------------------------------------------------------------|
> | [options]         | Object   | {}            | Message Collector options                                                   |
> | [options.timeout] | Number   | 10000         | Length in milliseconds before the collector ends automatically              |
> | [options.count]   | Number   | 10            | Maximum number of messages to collect. Set to 0 to collect as many messages |
> | [options.filter]  | Function | (msg) => true | A filter to check whether the message is valid or not                       |
>
> Returns `Promise<MessageCollector>` - See below for use

## client.awaitChannelMessages(channel, options);
> | Parameter | Type            | Default | Description                                      |
> |-----------|-----------------|---------|--------------------------------------------------|
> | channel   | TextableChannel |         | Text channel the message collector should run in |
> | [options] | Object          | {}      | See above                                        |
>
> Returns `Promise<MessageCollector>` - See below for use

## Class: MessageCollector
### Constructor `new Eris.MessageCollector(channel, options);`
> | Parameter | Type            | Default | Description                                      |
> |-----------|-----------------|---------|--------------------------------------------------|
> | channel   | TextableChannel |         | Text channel the message collector should run in |
> | [options] | Object          | {}      | See above                                        |

### Properties
> | Property   | Type                 | Description                                                    |
> |------------|----------------------|----------------------------------------------------------------|
> | channel    | TextableChannel      | Channel the message collector is running in                    |
> | timeout    | Number               | Length in milliseconds before the collector ends automatically |
> | count      | Number               | Maximum number of messages to collect                          |
> | collected  | Collection\<Message> | Messages collected                                             |
> | running    | Boolean              | Whether the collector is running or not                        |

### Functions
#### filter(msg)
> A filter to check whether the message is valid or not
> | Parameter | Type    | Default | Description               |
> |-----------|---------|---------|---------------------------|
> | msg       | Message |         | Message to check if valid |
>
> Returns `Boolean`

#### run()
> Start collecting messages
>
> Returns `Promise<MessageCollector>`

#### stop()
> Stop collecting messages
>
> Returns `void`

### Events
#### collect
> Fired when a message has been collected
> | Parameter | Type    | Description                              |
> |-----------|---------|------------------------------------------|
> | msg       | Message | Message that was added to the collection |

#### update
> Fired when a message in the collection has been updated
> | Parameter | Type    | Description                                |
> |-----------|---------|--------------------------------------------|
> | msg       | Message | Message that was updated in the collection |

#### delete
> Fired when a message in the collection has been deleted
> | Parameter | Type    | Description                                  |
> |-----------|---------|----------------------------------------------|
> | msg       | Message | Message that was deleted from the collection |

#### stop
> Fired when the collector has finished
