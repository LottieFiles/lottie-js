import strip from '@rollup/plugin-strip';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const package_ = require('./package.json');

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: package_.main,
        format: 'umd',
        name: 'Lottie',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: package_.module,
        format: 'es',
        sourcemap: true,
      },
    ],

    external: Object.keys(package_.dependencies || {}),

    plugins: [
      // Remove debugger statements and console.log calls
      !process.env.ROLLUP_WATCH && strip(),

      // Build
      esbuild({
        minify: process.env.NODE_ENV === 'production',
        target: 'esnext', // default, or 'es20XX', 'esnext'

        define: {
          __GENERATOR__: `'${package_.name} ${package_.version}'`,
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
