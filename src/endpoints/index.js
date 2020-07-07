const { warningMessage } = require('../../misc');

/**
 * @param {typeof import('eris')} E
 */
module.exports.init = (E) => {
  if (E.Endpoints !== undefined) return console.warn(`Eris.Endpoints is already defined! ${warningMessage('import')}`); // Because I'm an idiot and only supported functions
  Object.defineProperty(E, 'Endpoints', { value: require('eris/lib/rest/Endpoints') });
  console.log('Loaded import Endpoints');
};
