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
