var VueDropzone = (function (exports, Vue, simpleDropzone, _regeneratorRuntime, _asyncToGenerator) {
  'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
  _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;

  let Dropzone = function (params) {
    let defaultDropzoneOptions = {
      extensions: ["pdf"],
      maxFile: 1,
      onSuccess: function () {},
      onError: function () {},
      onDragEnter: function () {},
      onDragLeave: function () {}
    };
    let lastenter;
    let fExtensionMatch = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    Object.assign(defaultDropzoneOptions, params);

    this.onDrop =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee({
        files: files
      }) {
        var filesObjects, fObject, fileExtension, msg, file, fileBuffer;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              defaultDropzoneOptions.onDragLeave();
              filesObjects = files.entries();

            case 2:
              if (!(fObject = filesObjects.next().value)) {
                _context.next = 14;
                break;
              }

              fileExtension = fObject[0].match(fExtensionMatch);

              if (!(!fileExtension || !defaultDropzoneOptions.extensions.includes(fileExtension[1]))) {
                _context.next = 7;
                break;
              }

              msg = ["Invalid file extension - ", fileExtension[0]].join("");
              return _context.abrupt("return", defaultDropzoneOptions.onError(msg));

            case 7:
              file = fObject[1];
              _context.next = 10;
              return file.arrayBuffer();

            case 10:
              fileBuffer = _context.sent;
              return _context.abrupt("return", defaultDropzoneOptions.onSuccess(fileBuffer));

            case 14:
            case "end":
              return _context.stop();
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

  let Dropzone$1;
  let DropController;
  let binded = false;
  let lastActiveFlag = null;

  let onBind = function (el, binding, vnode) {
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

  let onDestroy = function (el, binding, vnode) {
    el.removeEventListener("dragover", DropController._onDragover);
    el.removeEventListener("drop", DropController._onDrop);
    el.removeEventListener("dragenter", Dropzone$1.onDragEnter);
    el.removeEventListener("dragleave", Dropzone$1.onDragLeave);
    binded = false;
  };

  let onUpdate = function (el, binding, vnode) {
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

  const install = function (Vue) {
    Vue.directive('dropzone', VueDropzone);
  };

  if (window.Vue) {
    Vue.use(install);
  }

  VueDropzone.install = install;

  exports.default = VueDropzone;

  return exports;

}({}, Vue, simpleDropzone, _regeneratorRuntime, _asyncToGenerator));
