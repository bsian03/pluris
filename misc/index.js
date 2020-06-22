module.exports = {
  /**
   * @param {import('eris')} Eris
   * @param {String} Class
   * @param {Function} fn
   */
  loadPrototype: (Eris, Class, fn) => {
    if (Eris[Class].prototype[fn.name]) return console.warn(`${fn.name} prototype already exists in ${Class}! ${this.warningMessage('prototype')}`);
    fn = fn.bind(Eris[Class].prototype);
    Eris[Class].prototype[fn.name] = fn;
    console.log(`Loaded ${Class}#${fn.name}`);
  },

  /**
   * @param {import('eris')} Eris
   * @param {new (...args) => any} Class
   */
  loadImport: (Eris, Class) => {
    if (Eris[Class.name]) return console.warn(`Eris.${Class.name} is already defined! ${this.warningMessage('import')}`);
    Eris[Class.name] = Class;
    console.log(`Loaded import ${Class.name}`);
  },

  warningMessage: (type) => `The ${type} has not been loaded. Please uninstall/disable any other modules/plugins which creates this override.`,
};
