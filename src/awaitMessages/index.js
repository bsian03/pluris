const { EventEmitter } = require('events');
const { Collection, Message } = require('eris');

/**
 * @typedef MessageCollectorOptions
 * @prop {Number} timeout Length in milliseconds before the collector ends automatically
 * @prop {Number} count Maximum number of messages to collect. Set to 0 to collect as many messages
 * @prop {(msg: Message) => Boolean} filter A function which takes a message parameter which returns a boolean indicating whether the message is valid or not
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
   * @param {import('eris').TextableChannel} channel Channel to collect messages in
   * @param {MessageCollectorOptions} options Options for the message collector
   */
  constructor(channel, options) {
    super();
    const opt = Object.assign(MessageCollectorDefaults, options);
    this.channel = channel;
    this.timeout = opt.timeout;
    this.count = opt.count;
    this.filter = opt.filter;
    this.collected = new Collection(Message);
    this.running = false;
  }

  /**
   * @param {Message} msg
   */
  _onMessageCreate(msg) {
    console.log(this.running);
    if (!this.running) return;
    console.log('Create running');
    if (!this.filter(msg)) return;
    console.log('Create filter');
    this.emit('collect', msg);
  }

  /**
   * @param {Message} msg
   * @param {import('eris').OldMessage} oldMsg
   */
  _onMessageUpdate(msg, oldMsg) {
    console.log(this.running);
    if (!this.running) return;
    console.log('Update Running');
    if (!this.filter(msg)) return this.collected.remove(msg);
    console.log('Update filter');
    if (!this.collected.has(oldMsg.id)) return this.emit('collect', msg);
    console.log('Update exists');
    this.emit('update', msg);
  }

  _onMessageDelete(msg) {
    console.log(this.running);
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
      this.channel.client.on('messageCreate', this._onMessageCreate);
      this.channel.client.on('messageUpdate', this._onMessageUpdate);
      this.channel.client.on('messageDelete', this._onMessageDelete);

      this.on('collect', this.onCollect);
      this.on('update', this.onUpdate);
      this.on('delete', this.onDelete);

      if (this.timeout) setTimeout(() => this.stop(), this.timeout);
      this.once('stop', () => res(this));
    });
  }

  stop() {
    this.running = false;
    this.channel.client.off('messageCreate', this._onMessageCreate);
    this.channel.client.off('messageUpdate', this._onMessageUpdate);
    this.channel.client.off('messageDelete', this._onMessageDelete);

    this.off('collect', this.onCollect);
    this.off('update', this.onUpdate);
    this.off('delete', this.onDelete);
    this.emit('stop');
    return this;
  }

  /**
   * @param {Message} msg
   */
  onCollect(msg) {
    console.log(msg);
    this.collected.add(msg);
    if (this.count && this.collected.size === this.count) this.stop();
  }

  /**
   * @param {Message} msg
   */
  onUpdate(msg) {
    console.log(msg);
    this.collected.update(msg);
  }

  /**
   * @param {Message} msg
   */
  onDelete(msg) {
    console.log(msg);
    this.collected.remove(msg);
  }
}

module.exports = MessageCollector;

/**
 * @param {import('eris')} Eris
 */
module.exports.init = (Eris) => {
  Eris.MessageCollector = MessageCollector;

  if (Eris.TextChannel.prototype.awaitMessages) console.warn('awaitMessage prototype already exists in TextChannel! The prototype has not been loaded. Please uninstall/disable any other modules which creates this override.');
  else {
    /**
     * Collect a bunch of messages
     * @param {MessageCollectorOptions} options
     */
    Eris.TextChannel.prototype.awaitMessages = function awaitMessages(options) {
      return new Promise((res) => res(new MessageCollector(this, options).run()));
    };
  }

  if (Eris.PrivateChannel.prototype.awaitMessages) console.warn('awaitMessage prototype already exists in NewsChannel! The prototype has not been loaded. Please uninstall/disable any other modules which creates this override.');
  else {
    Eris.PrivateChannel.prototype.awaitMessages = function awaitMessages(options) {
      return new Promise((res) => res(new MessageCollector(this, options).run()));
    };
  }
};
