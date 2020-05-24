import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import base from './rollup.config';

export default {
  ...base,
  plugins: [...base.plugins, serve({ contentBase: 'public', open: true }), livereload()],
};
