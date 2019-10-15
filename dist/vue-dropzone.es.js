import Vue from 'vue';
import { SimpleDropzone } from 'simple-dropzone';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';

var Dropzone = function Dropzone(params) {
  var defaultDropzoneOptions = {
    extensions: ["pdf"],
    maxFile: 1,
    onSuccess: function onSuccess() {},
    onError: function onError() {},
    onDragEnter: function onDragEnter() {},
    onDragLeave: function onDragLeave() {}
  };
  var lastenter;
  var fExtensionMatch = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  Object.assign(defaultDropzoneOptions, params);

  this.onDrop =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(_ref2) {
      var files, filesObjects, fObject, fileExtension, msg, file, fileBuffer;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              files = _ref2.files;
              defaultDropzoneOptions.onDragLeave();
              filesObjects = files.entries();

            case 3:
              if (!(fObject = filesObjects.next().value)) {
                _context.next = 15;
                break;
              }

              fileExtension = fObject[0].match(fExtensionMatch);

              if (!(!fileExtension || !defaultDropzoneOptions.extensions.includes(fileExtension[1]))) {
                _context.next = 8;
                break;
              }

              msg = ["Invalid file extension - ", fileExtension[0]].join("");
              return _context.abrupt("return", defaultDropzoneOptions.onError(msg));

            case 8:
              file = fObject[1];
              _context.next = 11;
              return file.arrayBuffer();

            case 11:
              fileBuffer = _context.sent;
              return _context.abrupt("return", defaultDropzoneOptions.onSuccess(fileBuffer));

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

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

var Dropzone$1;
var DropController;
var binded = false;
var lastActiveFlag = null;

var onBind = function onBind(el, binding, vnode) {
  if (!binding.value.active) {
    lastActiveFlag = binding.value.active;
    return;
  }

  DropController = new SimpleDropzone(el, document.createElement("input"));
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

export default VueDropzone;
