const { loadPrototype } = require('../../misc');

/**
 * @param {typeof import('eris')} E
 */
module.exports.init = (E) => {
  loadPrototype(E, 'Member', function roleList() {
    const collection = new E.Collection(E.Role);
    this.roles.forEach((r) => collection.add(this.guild.roles.get(r)));
    return collection;
  }, true);
};
