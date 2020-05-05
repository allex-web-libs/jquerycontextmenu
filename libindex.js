function createLib (execlib) {
  'use strict';

  var ret = {};
  require('./mixins')(execlib, ret);

  return ret;
}
module.exports = createLib;
