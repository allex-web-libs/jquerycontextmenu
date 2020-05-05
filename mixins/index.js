function createMixins (execlib, mylib) {
  'use strict';
  var lib = execlib.lib,
    ret = {};
  require('./contextmenucreator')(lib, ret);

  mylib.mixins = ret;
}
module.exports = createMixins;
