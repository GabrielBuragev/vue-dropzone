
#  vue_dropzone_directive

Its a simple Vue.js dropzone directive.

### Usage inside component
```js
import VueDropzone from "vue_dropzone_directive";
export default {
  directives: {
    'dropzone': VueDropzone
  }
}
```

### Global usage
```js
import  VueDropzone  from  "vue_dropzone_directive";
Vue.use(VueDropzone);

# inside component
<div class="dropzone" v-dropzone>
```

### Options
```js
<template>
  <div class="el" v-dropzone:[dropzoneOptions.active]="dropzoneOptions"></div>
</template>
<script>
export default {
  data(){
    return {
      dropzoneOptions: {
        // `active` is a directive toggler ( whether the dropzone should be active or not ) 
        active: true,
        extensions: ["pdf"], // List of extensions that the dropzone will accept
        // Below are all of the accepted callbacks
        onSuccess: this.onDropzoneUpload.bind(this),
        onError: this.onDropzoneUploadError.bind(this),
        onDragEnter: this.onDropzoneDragEnter.bind(this),
        onDragLeave: this.onDropzoneDragLeave.bind(this)
      }
    }
  },
  methods: {
    onDropzoneDragEnter() {},
		onDropzoneDragLeave() {},
		onDropzoneUpload(file) { // file is the ArrayBuffer
		  let  binarySrc  =  new  Uint8Array(file);
    },
    onDropzoneUploadError(msg) {}, // msg is the Error message
  }
}
</script>
```