(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
var lR = ALLEX.execSuite.libRegistry;
lR.register('allex_jquerycontextmenuweblib',
  require('./libindex')(ALLEX)
);

},{"./libindex":2}],2:[function(require,module,exports){
function createLib (execlib) {
  'use strict';

  var ret = {};
  require('./mixins')(execlib, ret);

  return ret;
}
module.exports = createLib;

},{"./mixins":4}],3:[function(require,module,exports){
function createContextMenuMixin (lib, mylib) {
  'use strict';

  function ContextMenuMixin () {
  }
  ContextMenuMixin.prototype.destroy = function () {
    jQuery.contextMenu('destroy', this.$element);
  };
  ContextMenuMixin.prototype.initializeContextMenu = function () {
    var cm = this.getConfigVal('contextmenu');
    if (!cm) {
      return;
    }
    cm.callback = onContextMenu.bind(null, this);
    this.$element.contextMenu(cm);
  };

  function onContextMenu(cmel, key, options) {
    var methodname;
    if (!cmel) {
      return;
    }
    methodname = 'onContextMenu_'+key;
    if (!lib.isFunction(cmel[methodname])) {
      return;
    }
    cmel[methodname](options);
  }

  ContextMenuMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, ContextMenuMixin
      ,'initializeContextMenu'
    );
    klass.prototype.postInitializationMethodNames = 
      klass.prototype.postInitializationMethodNames.concat(['initializeContextMenu']);
  };

  mylib.ContextMenu = ContextMenuMixin;
}
module.exports = createContextMenuMixin;

},{}],4:[function(require,module,exports){
function createMixins (execlib, mylib) {
  'use strict';
  var lib = execlib.lib,
    ret = {};
  require('./contextmenucreator')(lib, ret);

  mylib.mixins = ret;
}
module.exports = createMixins;

},{"./contextmenucreator":3}]},{},[1]);
