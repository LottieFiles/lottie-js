import strip from '@rollup/plugin-strip';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'Lottie',
        exports: 'named',
        sourcemap: true,

        globals: {
          'cross-fetch': 'Cross Fetch',
        },
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],

    external: Object.keys(pkg.dependencies || {}),

    plugins: [
      // Remove debugger statements and console.log calls
      !process.env.ROLLUP_WATCH && strip(),

      // Build
      esbuild({
        minify: process.env.NODE_ENV === 'production',
        target: 'esnext', // default, or 'es20XX', 'esnext'

        define: {
          __GENERATOR__: `'${pkg.name} ${pkg.version}'`,
        },
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
