const { EventEmitter } = require('events');
const Eris = require('eris');
const { loadPrototype, loadImport } = require('../../misc');

/**
 * @typedef MessageCollectorOptions
 * @prop {Number} timeout Length in milliseconds before the collector ends automatically
 * @prop {Number} count Maximum number of messages to collect. Set to 0 to collect as many messages
 * @prop {(msg: Eris.Message) => Boolean} filter A function which takes a message parameter which returns a boolean indicating whether the message is valid or not
 */

/**
 * @type {MessageCollectorOptions}
 */
const MessageCollectorDefaults = {
  timeout: 10000,
  count: 10,
  filter: (_msg) => true, // eslint-disable-line
};

class MessageCollector extends EventEmitter {
  /**
   * @param {Eris.TextableChannel} channel Channel to collect messages in
   * @param {MessageCollectorOptions} [options] Options for the message collector
   */
  constructor(channel, options = {}) {
    super();
    const opt = Object.assign(MessageCollectorDefaults, options);
    this.channel = channel;
    this.timeout = opt.timeout;
    this.count = opt.count;
    this.filter = opt.filter;
    this.collected = new Eris.Collection(Eris.Message);
    this.running = false;

    this._onMessageCreate = this._onMessageCreate.bind(this);
    this._onMessageDelete = this._onMessageDelete.bind(this);
    this._onMessageUpdate = this._onMessageUpdate.bind(this);

    this.onCollect = this.onCollect.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * @param {Eris.Message} msg
   */
  _onMessageCreate(msg) {
    if (!this.running) return;
    if (this.channel.id !== msg.channel.id) return;
    if (!this.filter(msg)) return;
    this.emit('collect', msg);
  }

  /**
   * @param {Eris.Message} msg
   * @param {Eris.OldMessage} oldMsg
   */
  _onMessageUpdate(msg, oldMsg) {
    if (!this.running) return;
    if (this.channel.id !== msg.channel.id) return;
    if (!this.filter(msg)) return this.collected.remove(msg);
    if (!this.collected.has(oldMsg.id)) return this.emit('collect', msg);
    this.emit('update', msg);
  }

  _onMessageDelete(msg) {
    if (!this.running) return;
    if (!this.collected.has(msg.id)) return;
    this.emit('delete', msg);
  }

  /**
   * @returns {Promise<MessageCollector>}
   */
  run() {
    this.running = true;
    return new Promise((res) => {
      this.channel.client.setMaxListeners(this.getMaxListeners() + 1);
      this.channel.client.on('messageCreate', this._onMessageCreate);
      this.channel.client.on('messageUpdate', this._onMessageUpdate);
      this.channel.client.on('messageDelete', this._onMessageDelete);

      this.setMaxListeners(this.getMaxListeners() + 1);
      this.on('collect', this.onCollect);
      this.on('update', this.onUpdate);
      this.on('delete', this.onDelete);

      if (this.timeout) setTimeout(() => this.stop(), this.timeout);
      this.once('stop', () => res(this));
    });
  }

  stop() {
    this.running = false;
    this.channel.client.setMaxListeners(this.getMaxListeners() - 1);
    this.channel.client.off('messageCreate', this._onMessageCreate);
    this.channel.client.off('messageUpdate', this._onMessageUpdate);
    this.channel.client.off('messageDelete', this._onMessageDelete);

    this.setMaxListeners(this.getMaxListeners() - 1);
    this.off('collect', this.onCollect);
    this.off('update', this.onUpdate);
    this.off('delete', this.onDelete);
    this.emit('stop');
    return this;
  }

  /**
   * @param {Eris.Message} msg
   */
  onCollect(msg) {
    this.collected.add(msg);
    if (this.count && this.collected.size === this.count) this.stop();
  }

  /**
   * @param {Eris.Message} msg
   */
  onUpdate(msg) {
    this.collected.update(msg);
  }

  /**
   * @param {Eris.Message} msg
   */
  onDelete(msg) {
    this.collected.remove(msg);
  }
}

module.exports = MessageCollector;

/**
 * @param {Eris} E
 */
module.exports.init = (E) => {
  loadImport(E, MessageCollector);
  loadPrototype(E, 'TextChannel', function awaitMessages(options = {}) {
    return new MessageCollector(this, options).run();
  });
  loadPrototype(E, 'PrivateChannel', function awaitMessages(options = {}) {
    return new MessageCollector(this, options).run();
  });
  loadPrototype(E, 'Client', function awaitChannelMessages(channel, options = {}) {
    return new MessageCollector(channel, options).run();
  });
};
