const { EventEmitter } = require('events');
const { continuousReactionStream } = require('eris-reactions');

/**
 * @typedef ReactionCollectorOptions
 * @prop {Number} timeout Length in milliseconds before the collector ends automatically. Set this and count to 0 for continous/permanent collection
 * @prop {Number} count Maximum number of reactions to collect. Set this and timeout to 0 for continous/permanent collection
 * @prop {(msg: import('eris').Message) => Boolean} filter A function which takes a user ID parameter which returns a boolean indicating whether the reaction is valid or not
 */

/**
 * @type {ReactionCollectorOptions}
 */
const ReactionCollectorDefaults = {
  timeout: 1000,
  count: 10,
  filter: (_msg) => true, // eslint-disable-line
};

class ReactionCollector extends EventEmitter {
  /**
   * @param {import('eris').Message} message
   * @param {ReactionCollectorOptions} options
   */
  constructor(message, options) {
    super();
    const opt = Object.assign(ReactionCollectorDefaults, options);
    this.message = message;
    this.timeout = opt.timeout;
    this.count = opt.count;
    this.filter = opt.filter;
    this.collected = [];
    this.running = false;
  }

  /**
   * @returns {Promise<ReactionCollector>}
   */
  run() {
    this.running = true;
    const ReactionHandler = continuousReactionStream;
    return new Promise((res) => {
      this.handler = new ReactionHandler(this.message, this.filter, !this.timeout && !this.count, { time: this.timeout, maxMatches: this.count });
      this.handler.on('reacted', this.collected.push);
      this.handler.once('end', (collected) => {
        this.collected = collected; // Just to confirm
        res(this);
      });
    });
  }

  stop() {
    this.running = false;
    if (this.handler) this.handler.stopListening('Called by user');
  }
}

module.exports = ReactionCollector;

/**
 * @param {import('eris')} E
 */
module.exports.init = (E) => {
  E.ReactionCollector = ReactionCollector;

  if (E.TextChannel.prototype.awaitMessages) console.warn('awaitMessage prototype already exists in TextChannel! The prototype has not been loaded. Please uninstall/disable any other modules which creates this override.');
  else {
    /**
     * Collect a bunch of messages
     * @param {MessageCollectorOptions} options
     */
    E.Message.prototype.awaitReactions = function awaitMessages(options) {
      return new Promise((res) => res(new ReactionCollector(this, options).run()));
    };
  }
};
