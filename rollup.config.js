import 'dotenv/config';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import path from 'path';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = importee =>
  importee === 'svelte' || importee.startsWith('svelte/');

const customAlias = alias({
  resolve: ['.svelte', '.js', '.json'],
  entries: [
    {
      find: 'components',
      replacement: path.resolve(__dirname, 'src/components')
    }
  ]
});

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [
      require('autoprefixer'),
      require('postcss-import'),
      require('postcss-custom-media')
    ]
  }
});

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      customAlias,
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      svelte({
        dev,
        preprocess,
        hydratable: true,
        emitCss: true
      }),
      resolve({
        browser: true,
        dedupe
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead'
              }
            ]
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true
              }
            ]
          ]
        }),

      !dev &&
        terser({
          module: true
        }),

      json()
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.SESSIONS_DB_ROLE': process.env.SESSIONS_DB_ROLE,
        'process.env.SESSIONS_DB_NAME': process.env.SESSIONS_DB_NAME,
        'process.env.SESSIONS_DB_PASSWORD': process.env.SESSIONS_DB_PASSWORD,
        'process.env.SESSIONS_DB_TABLE': process.env.SESSIONS_DB_TABLE,
        'process.env.SESSIONS_SECRET': process.env.SESSIONS_SECRET,

        'process.env.URL_PROXY_API': process.env.URL_PROXY_API
      }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess
      }),
      resolve({
        dedupe
      }),
      commonjs(),

      customAlias,

      json()
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),

    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    onwarn
  }
};
