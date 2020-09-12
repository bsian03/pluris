
# webhooks
Webhook Cache. Includes a DiscordWebhook class

## channel.syncWebhooks();
>
> Returns `Promise<void>`

## guild.syncWebhooks();
>
> Returns `Promise<void>`

## client.syncChannelWebhooks(channelID);
> | Parameter | Type   | Default | Description                    |
> |-----------|--------|---------|------------------------------- |
> | channelID | String |         | Channel ID to sync webhooks in |
>
> Returns `Promise<void>`

## client.syncGuildWebhooks(channelID);
> | Parameter | Type   | Default | Description                  |
> |-----------|--------|---------|----------------------------- |
> | channelID | String |         | Guild ID to sync webhooks in |
>
> Returns `Promise<void>`

## channel.webhooks;
> 
> Returns `Collection<DiscordWebhook>` - See below for use

## message.webhook;
>
> Returns `DiscordWebhook | Object` - See below for use. This will only be an object with an `id` key if the webhook is not cached.

## guild.webhooks;
>
> Returns `Collection<DiscordWebhook>` - See below for use

## Class: DiscordWebhook extends Base
### Constructor `new Eris.DiscordWebhook(data, client);`
> | Parameter | Type   | Default | Description                   |
> |-----------|--------|---------|-------------------------------|
> | data      | Object |         | Webhook data from Discord API |
> | client    | Client |         | Bot Client                    |

### Properties
> | Property         | Type                 | Description                                                                                      |
> |------------------|----------------------|--------------------------------------------------------------------------------------------------|
> | client           | Client               | Bot Client                                                                                       |
> | type             | Number               | `1` is a normal webhook, `2` is a channel follower webhook                                       |
> | channel          | GuildTextableChannel | Channel the webhook belongs in                                                                   |
> | name             | ?String              | Default name of webhook                                                                          |
> | avatar           | ?String              | Default avatar hash of webhook                                                                   |
> | avatarURL        | String               | Default avatar URL of webhook                                                                    |
> | guild?           | Guild \| Object      | Guild the webhook belongs in. This will be an object with an `id` key if the guild is not cached |
> | user?            | User                 | User that created the webhook                                                                    |
> | token?           | String               | Webhook token                                                                                    |
> | defaultAvatarURL | String               | Default Discord avatar URL of the webhook                                                        |

### Functions
#### update(data)
> Updates the cached webhook
> | Parameter | Type    | Default | Description                   |
> |-----------|---------|---------|-------------------------------|
> | data      | Object  |         | Webhook data from Discord API |
>
> Returns `void`

#### delete(token)
> Delete the webhook
> | Parameter | Type    | Default | Description                                         |
> |-----------|---------|---------|-----------------------------------------------------|
> | [token]   | Boolean | false   | Whether to use the webhook token for authentication |
>
> Returns `Promise<void>`

#### edit(options, token, reason);
> Edits the webhook
> | Parameter           | Type    | Default | Description                                                                                             |
> |---------------------|---------|---------|---------------------------------------------------------------------------------------------------------|
> | options             | Object  |         | Webhook Options                                                                                         |
> | [options.avatar]    | String  |         | The new default avatar as a base64 data URI. Note: base64 strings alone are not base64 data URI strings |
> | [options.channelID] | String  |         | The new channel ID where webhooks should be sent to                                                     |
> | [options.name]      | String  |         | The new default name                                                                                    |
> | [token]             | Boolean | `false` | Whether to authenticate using the webhook token or not                                                  |
> | [reason]            | String  |         | The reason to be displayed in audit logs                                                                |
>
> Returns `void`

#### execute(options);
> Executes the webhook
> | Parameter      | Type    | Default | Description                                                                                                                  |
> |----------------|---------|---------|------------------------------------------------------------------------------------------------------------------------------|
> | options        | Object  |         | Webhook payload - Please refer to the [documentation](https://abal.moe/Eris/docs/Client#function-executeWebhook) for details |
>
> Returns `Promise<void|Message>` - If `wait` is true, then the message object will be returned

#### executeSlack(options);
> Executes the webhook
> | Parameter      | Type    | Default | Description                                                                                                                       |
> |----------------|---------|---------|-----------------------------------------------------------------------------------------------------------------------------------|
> | options        | Object  |         | Webhook payload - Please refer to the [documentation](https://abal.moe/Eris/docs/Client#function-executeSlackWebhook) for details |
>
> Returns `Promise<void|Message>` - If `wait` is true, then the message object will be returned
