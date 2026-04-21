import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60000);

export function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

import CustomWorld from '../support/world.js';

CustomWorld.prototype._getNestedValue = function(obj, path) {
  return getNestedValue(obj, path);
};
