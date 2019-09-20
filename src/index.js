
import Vue from 'vue';
import VueDropzone from './core';

const install = function (Vue) {
    Vue.directive('dropzone', VueDropzone);
};

if (window.Vue) {
    Vue.use(install);
}

VueDropzone.install = install;

export default VueDropzone;