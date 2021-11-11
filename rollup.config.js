import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import path from 'path';
import { defineConfig } from 'rollup';
import autoExternal from 'rollup-plugin-auto-external';
import pkgJson from './package.json';

export default defineConfig([
  {
    input: 'src/index.js',
    output: {
      file: pkgJson.module,
      format: 'esm',
      sourcemap: true,
      generatedCode: 'es2015',
    },
    external: [/@babel\/runtime/],
    plugins: [
      autoExternal({
        packagePath: path.resolve(__dirname, 'package.json'),
      }),
      nodeResolve(),
      babel({
        babelHelpers: 'runtime',
      }),
      commonjs(),
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        preventAssignment: true,
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: pkgJson.main,
      format: 'umd',
      sourcemap: true,
      generatedCode: 'es2015',
      name: 'ReactMobiledocEditor',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'mobiledoc-kit': 'Mobiledoc',
      },
      amd: {
        id: 'ReactMobiledocEditor',
      },
      namespaceToStringTag: true,
    },
    plugins: [
      autoExternal({
        packagePath: path.resolve(__dirname, 'package.json'),
      }),
      nodeResolve(),
      babel({
        presets: ['@babel/preset-react', '@babel/preset-env'],
        babelHelpers: 'bundled',
        babelrc: false,
      }),
      commonjs(),
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
        preventAssignment: true,
      }),
    ],
  },
]);
