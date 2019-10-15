import babel from 'rollup-plugin-babel'

let LIBRARY_NAME = 'VueDropzone';
let FILE_NAME = "vue-dropzone";
export default {
    input: './src/index.js',
    output: [
        {
            file: `dist/${FILE_NAME}.common.js`,
            format: 'cjs',
            exports: 'named',
        },
        {
            file: `dist/${FILE_NAME}.es.js`,
            format: 'es',
            exports: 'named',

        },
        {
            file: `dist/${FILE_NAME}.umd.js`,
            format: 'umd',
            name: LIBRARY_NAME,
            exports: 'named',

        },
        {
            file: `dist/${FILE_NAME}.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            exports: 'named',

        },
        {
            file: `dist/${FILE_NAME}.min.js`,
            format: 'iife',
            name: LIBRARY_NAME,
            exports: 'named',
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelrc: true,
            "runtimeHelpers": true,
            extensions: ['.js', '.es6', '.es', '.vue']
        }),
    ],
}