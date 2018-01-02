let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        modules: [
          path.resolve(__dirname, 'resources/assets/jsx'),
          path.resolve(__dirname, 'node_modules/'),
        ]
    }
}).react('resources/assets/jsx/main.jsx', 'public/js/public.js')
  .react('resources/assets/jsx/board.jsx', 'public/js/board.js')
  .extract([
    'react',
    'react-dom',
    'react-router-dom',
    'react-bootstrap',
    'fbemitter',
    'create-react-class',
    'react-addons-pure-render-mixin',
    'lodash',
    'prop-types',
    'classnames',
    'reactstrap',
  ])
  .sourceMaps()

mix.sass('resources/assets/scss/main.scss', 'public/css')

if (mix.inProduction()) {
    mix.version()
}
