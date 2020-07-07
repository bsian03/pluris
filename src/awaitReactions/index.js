const { EventEmitter } = require('events');
const { continuousReactionStream } = require('eris-reactions');
const { loadImport, loadPrototype } = require('../../misc');

/**
 * @typedef ReactionCollectorOptions
 * @prop {Number} timeout Length in milliseconds before the collector ends automatically. Set this and count to 0 for continous/permanent collection
 * @prop {Number} count Maximum number of reactions to collect. Set this and timeout to 0 for continous/permanent collection
 * @prop {(userID: String) => Boolean} filter A function which takes a user ID parameter which returns a boolean indicating whether the reaction is valid or not
 */

/**
 * @type {ReactionCollectorOptions}
 */
const ReactionCollectorDefaults = {
  timeout: 10000,
  count: 10,
  filter: (_msg) => true, // eslint-disable-line
};

class ReactionCollector extends EventEmitter {
  /**
   * @param {import('eris').Message} message
   * @param {ReactionCollectorOptions} options
   */
  constructor(message, options = {}) {
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
    if (!this.running) this.setMaxListeners(this.getMaxListeners() + 1);
    const ReactionHandler = continuousReactionStream;
    return new Promise((res) => {
      this.handler = new ReactionHandler(this.message, this.filter, !this.timeout && !this.count, { time: this.timeout, maxMatches: this.count });
      this.handler.client.setMaxListeners(this.handler.client.getMaxListeners() + 1);
      this.handler.setMaxListeners(this.handler.getMaxListeners() + 1);

      this.handler.on('reacted', (x) => {
        this.emit('collect', x);
        this.collected.push(x);
      });
      this.handler.once('end', (collected) => {
        this.collected = collected; // Just to confirm
        this.stop();
        res(this);
      });
    });
  }

  stop() {
    if (this.running) this.setMaxListeners(this.getMaxListeners() - 1);
    this.running = false;

    if (this.handler) {
      this.handler.client.setMaxListeners(this.handler.client.getMaxListeners() - 1);
      if (!this.handler.ended) this.handler.stopListening('Called by user');
      this.handler.off('messageReactionAdd', this.handler.listener);
      this.handler.setMaxListeners(this.handler.getMaxListeners() - 1);
    }
    this.emit('stop');
  }
}

module.exports = ReactionCollector;

/**
 * @param {import('eris')} E
 */
module.exports.init = (E) => {
  loadImport(E, ReactionCollector);
  loadPrototype(E, 'Message', function awaitReactions(options) {
    return new ReactionCollector(this, options).run();
  });
  loadPrototype(E, 'Client', function awaitMessageReactions(message, options) {
    return new ReactionCollector(message, options).run();
  });
};
