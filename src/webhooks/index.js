const { loadPrototype, loadImport } = require('../../misc');

/**
 * @param {import('eris')} E
 */
module.exports.init = (E, config) => {
  class DiscordWebhook extends E.Base { // Prevent TypeScript documentation conflicts
    /**
     * @param {Record<string, unknown>} data
     * @param {import('eris').Client} client
     */
    constructor(data, client) {
      super(data.id);
      this.client = client;
      this.type = data.type;
      this.channel = client.getChannel(data.channel_id) || { id: data.channel_id };
      this.name = data.name;
      this.avatar = data.avatar;
      if (data.guild_id !== undefined) {
        this.guild = client.guilds.get(data.guild_id) || { id: data.guild_id };
      }
      if (data.user !== undefined) {
        this.user = client.users.update(data.user);
      }
      if (data.token !== undefined) {
        this.token = data.token;
      }
    }
    update(data) {
      if (data.name !== undefined) {
        this.name = data.name;
      }
      if (data.avatar !== undefined) {
        this.avatar = data.avatar;
      }
      if (data.channel_id !== undefined) {
        this.channel = this.client.getChannel(data.channel_id) || { id: data.channel_id };
      }
    }

    get avatarURL() {
      if (config.endpoints !== true) {
        throw new Error('Endpoint plugin must be enabled for this Pluris feature to work');
      }
      return this.avatar ? this.client._formatImage(E.Endpoints.USER_AVATAR(this.id, this.avatar)) : this.defaultAvatarURL;
    }

    get defaultAvatarURL() {
      if (config.endpoints !== true) {
        throw new Error('Endpoint plugin must be enabled for this Pluris feature to work');
      }
      return `${E.Endpoints.CDN_URL}${E.Endpoints.DEFAULT_USER_AVATAR(0)}.png`;
    }

    delete(token = false) {
      return this.client.deleteWebhook(this.id, token ? this.token : null);
    }

    edit(options, token = false, reason) {
      return this.client.editWebhook(this.id, options, token ? this.token : null, reason).then((w) => {
        this.update(w);
        return this;
      });
    }

    execute(options) {
      if (!this.token) {
        throw new Error('Missing Webhook Token');
      }

      return this.client.executeWebhook(this.id, this.token, options);
    }

    executeSlack(options) {
      if (!this.token) {
        throw new Error('Missing Webhook Token');
      }

      return this.client.executeSlackWebhook(this.id, this.token, options);
    }
  }

  loadImport(E, DiscordWebhook);
  loadPrototype(E, 'Message', function webhook() {
    return this.channel.webhooks.get(this.webhookID) || { id: this.webhookID };
  }, true);
  loadPrototype(E, 'Client', function syncGuildWebhooks(guildID) {
    return this.getGuildWebhooks(guildID)
      .then((webhooks) => webhooks.forEach((w) => this.guilds.get(w.guild_id).channels.get(w.channel_id).webhooks.update(w, this)));
  });
  loadPrototype(E, 'Client', function syncChannelWebhooks(channelID) {
    return this.getChannelWebhooks(channelID)
      .then((webhooks) => webhooks.forEach((w) => this.guilds.get(w.guild_id).channels.get(w.channel_id).webhooks.update(w, this)));
  });
  loadPrototype(E, 'Guild', function syncWebhooks() {
    return this._client.syncGuildWebhooks(this.id);
  });
  loadPrototype(E, 'Guild', function webhooks() {
    if (!this._webhooks) this._webhooks = new E.Collection(DiscordWebhook);
    return this._webhooks;
  }, true);
  loadPrototype(E, 'TextChannel', function syncWebhooks() {
    return this.client.syncChannelWebhooks(this.id);
  });
  loadPrototype(E, 'TextChannel', function webhooks() {
    if (!this._webhooks) this._webhooks = new E.Collection(DiscordWebhook);
    return this._webhooks;
  }, true);
};
