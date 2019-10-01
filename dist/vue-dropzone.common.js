'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var simpleDropzone = require('simple-dropzone');

var Dropzone = function Dropzone(params) {
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

var Dropzone$1 = void 0;
var DropController = void 0;
var binded = false;
var lastActiveFlag = null;

var onBind = function onBind(el, binding, vnode) {
    if (!binding.value.active) {
        lastActiveFlag = binding.value.active;
        return;
    }
    DropController = new simpleDropzone.SimpleDropzone(el, document.createElement("input"));
    Dropzone$1 = new Dropzone(binding.value ? binding.value : {});

    DropController.on("drop", Dropzone$1.onDrop);
    DropController.on("dropstart", Dropzone$1.onDropStart);
    DropController.on("droperror", Dropzone$1.onDropError);
    el.addEventListener("dragenter", Dropzone$1.onDragEnter);
    el.addEventListener("dragleave", Dropzone$1.onDragLeave);

    binded = true;
};
var onDestroy = function onDestroy(el, binding, vnode) {
    el.removeEventListener("dragover", DropController._onDragover);
    el.removeEventListener("drop", DropController._onDrop);
    el.removeEventListener("dragenter", Dropzone$1.onDragEnter);
    el.removeEventListener("dragleave", Dropzone$1.onDragLeave);
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
var VueDropzone = {
    bind: onBind,
    unbind: onDestroy,
    update: onUpdate
};

var install = function install(Vue) {
    Vue.directive('dropzone', VueDropzone);
};

if (window.Vue) {
    Vue.use(install);
}

VueDropzone.install = install;

exports.default = VueDropzone;
