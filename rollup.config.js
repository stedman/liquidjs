import shim from 'rollup-plugin-shim'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

const fake = { fs: `export default {}`, path: `export default {}` }
const version = process.env.VERSION || pkg.version
const sourcemap = true
const banner = `/*
 * liquidjs@${version}, https://github.com/harttle/liquidjs
 * (c) 2016-${new Date().getFullYear()} harttle
 * Released under the MIT License.
 */`
const treeshake = {
  propertyReadSideEffects: false
}
const input = 'src/liquid.ts'

export default [{
  output: [{
    file: 'dist/liquid.common.js',
    name: 'Liquid',
    format: 'cjs',
    sourcemap,
    banner
  }],
  external: ['path', 'fs'],
  plugins: [typescript({
    include: [ '*.ts', '**/*.ts', '*.js', '**/*.js' ],
    tsconfigOverride: { compilerOptions: {
      module: 'ES2015',
      baseUrl: '.',
      paths: {
        'template': ['src/parser/template'],
        'src/*': ['src/*']
      }
    } }
  })],
  treeshake,
  input
}, {
  output: [{
    file: 'dist/liquid.js',
    name: 'Liquid',
    format: 'umd',
    sourcemap,
    banner
  }],
  plugins: [
    shim(fake),
    typescript({
      include: [ '*.ts', '**/*.ts', '*.js', '**/*.js' ],
      tsconfigOverride: { compilerOptions: {
        module: 'ES2015',
        baseUrl: '.',
        paths: {
          'template': ['src/parser/template-browser'],
          'src/*': ['src/*']
        }
      } }
    })
  ],
  treeshake,
  input
}, {
  output: [{
    file: 'dist/liquid.min.js',
    name: 'Liquid',
    format: 'umd',
    sourcemap
  }],
  plugins: [
    shim(fake),
    typescript({
      include: [ '*.ts', '**/*.ts', '*.js', '**/*.js' ],
      tsconfigOverride: { compilerOptions: {
        module: 'ES2015',
        baseUrl: '.',
        paths: {
          'template': ['src/parser/template-browser'],
          'src/*': ['src/*']
        }
      } }
    }),
    uglify()
  ],
  treeshake,
  input
}]
