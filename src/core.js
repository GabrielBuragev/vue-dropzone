import { SimpleDropzone } from "simple-dropzone";
import CustomDropzone from "./lib/dropzone";

let Dropzone;
let DropController;
let binded = false;
let lastActiveFlag = null;

const onBind = (el, binding, vnode) => {
  if (!binding.value.active) {
    lastActiveFlag = binding.value.active;
    return;
  }
  DropController = new SimpleDropzone(el, document.createElement("input"));
  Dropzone = new CustomDropzone(binding.value ? binding.value : {});

  DropController.on("drop", Dropzone.onDrop);
  DropController.on("dropstart", Dropzone.onDropStart);
  DropController.on("droperror", Dropzone.onDropError);
  el.addEventListener("dragenter", Dropzone.onDragEnter);
  el.addEventListener("dragleave", Dropzone.onDragLeave);

  binded = true;
};
const onDestroy = (el, binding, vnode) => {
  if (DropController) {
    el.removeEventListener("dragover", DropController._onDragover);
    el.removeEventListener("drop", DropController._onDrop);
    el.removeEventListener("dragenter", Dropzone.onDragEnter);
    el.removeEventListener("dragleave", Dropzone.onDragLeave);
  }
  binded = false;
};
const onUpdate = (el, binding, vnode) => {
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
export default {
  bind: onBind,
  unbind: onDestroy,
  update: onUpdate
};
