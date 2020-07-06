const { loadPrototype } = require('../../misc');

/**
 * @param {Eris} E
 */
module.exports.init = (E) => {
  loadPrototype(E, 'User', function createMessage(content, file) {
    return this._client.getDMChannel(this.id).then((channel) => channel.createMessage(content, file));
  });
  loadPrototype(E, 'Client', function createDMMessage(userID, content, file) {
    return this.getDMChannel(userID).then((channel) => channel.createMessage(content, file));
  });
};
