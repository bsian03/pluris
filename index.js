/**
 * @typedef PlurisPlugins
 * @prop {Boolean} awaitMessages
 */

/**
 * @type {PlurisPlugins}
 */
const plugins = {
  awaitMessages: true,
};

/**
 * @param {import('eris')} Eris
 * @param {PlurisPlugins} options
 */
module.exports = (Eris, options) => {
  const selectedPlugins = Object.keys(options);
  selectedPlugins.forEach((k) => {
    if (typeof plugins[k] === 'undefined') return console.error(`Unknown option: ${k}`);
    if (typeof options[k] !== 'boolean') throw new TypeError(`Expecting type boolean for option ${k}. Received type ${typeof options[k]}.`);
    plugins[k] = options[k];
  });

  let count = 0;
  Object.keys(plugins).forEach((k) => {
    if (plugins[k] === false) return;
    const plugin = require(`./src/${k}`);

    plugin.init(Eris);
    delete plugin.init;
    count += 1;
  });

  console.log(`Loaded ${count} pluris plugins`);
};
