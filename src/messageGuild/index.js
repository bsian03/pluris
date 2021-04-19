const { loadPrototype } = require('../../misc');

/**
 * @param {typeof import('eris')} E
 */
module.exports.init = (E) => {
  loadPrototype(E, 'Message', function guild() {
    return this.channel.guild || this._client.get(this.guildID);
  }, true);
};
