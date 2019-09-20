(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('simple-dropzone')) :
	typeof define === 'function' && define.amd ? define(['vue', 'simple-dropzone'], factory) :
	(global.VueStickyDirective = factory(global.Vue,global.simpleDropzone));
}(this, (function (Vue,simpleDropzone) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

var Dropzone$1 = function Dropzone(params) {
  var defaultDropzoneOptions = {
    extensions: ["pdf"],
    maxFile: 1,
    onSuccess: function onSuccess() {},
    onError: function onError() {},
    onDragEnter: function onDragEnter() {},
    onDragLeave: function onDragLeave() {}
  };
  var lastenter = void 0;
  var fExtensionMatch = /\.([0-9a-z]+)(?:[\?#]|$)/i;

  Object.assign(defaultDropzoneOptions, params);

  this.onDrop = async function (_ref) {
    var files = _ref.files;

    defaultDropzoneOptions.onDragLeave();

    var filesObjects = files.entries();
    var fObject = void 0;

    while (fObject = filesObjects.next().value) {
      var fileExtension = fObject[0].match(fExtensionMatch);
      if (!fileExtension || !defaultDropzoneOptions.extensions.includes(fileExtension[1])) {
        var msg = ["Invalid file extension - ", fileExtension[0]].join("");
        return defaultDropzoneOptions.onError(msg);
      }

      var file = fObject[1];
      var fileBuffer = await file.arrayBuffer();
      return defaultDropzoneOptions.onSuccess(fileBuffer);
    }
  };
  this.onDropStart = function () {};
  this.onDropError = function (msg) {
    defaultDropzoneOptions.onError(msg);
  };
  this.onDragEnter = function (event) {
    lastenter = event.target;
    defaultDropzoneOptions.onDragEnter();
  };
  this.onDragLeave = function (event) {
    if (lastenter === event.target) {
      defaultDropzoneOptions.onDragLeave();
    }
  };
};

var Dropzone = void 0;
var DropController = void 0;
var binded = false;
var lastActiveFlag = null;

var onBind = function onBind(el, binding, vnode) {
    if (!binding.value.active) {
        lastActiveFlag = binding.value.active;
        return;
    }
    DropController = new simpleDropzone.SimpleDropzone(el, document.createElement("input"));
    Dropzone = new Dropzone$1(binding.value ? binding.value : {});

    DropController.on("drop", Dropzone.onDrop);
    DropController.on("dropstart", Dropzone.onDropStart);
    DropController.on("droperror", Dropzone.onDropError);
    el.addEventListener("dragenter", Dropzone.onDragEnter);
    el.addEventListener("dragleave", Dropzone.onDragLeave);

    binded = true;
};
var onDestroy = function onDestroy(el, binding, vnode) {
    el.removeEventListener("dragover", DropController._onDragover);
    el.removeEventListener("drop", DropController._onDrop);
    el.removeEventListener("dragenter", Dropzone.onDragEnter);
    el.removeEventListener("dragleave", Dropzone.onDragLeave);
    binded = false;
};
var onUpdate = function onUpdate(el, binding, vnode) {
    if (binding.value.active === lastActiveFlag) return;

    if (!binding.value.active && binded) {
        try {
            onDestroy(el, binding, vnode);
        } catch (e) {
            console.log(e);
        }
    } else if (binding.value.active && !binded) {
        try {
            onBind(el, binding, vnode);
        } catch (e) {
            console.log(e);
        }
    }
    lastActiveFlag = binding.value.active;
};
var VueDropzone$1 = {
    bind: onBind,
    unbind: onDestroy,
    update: onUpdate
};

var install = function install(Vue$$1) {
    Vue$$1.directive('dropzone', VueDropzone$1);
};

if (window.Vue) {
    Vue.use(install);
}

VueDropzone$1.install = install;

return VueDropzone$1;

})));
