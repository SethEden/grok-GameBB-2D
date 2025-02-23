import path from 'path';
import { fileURLToPath } from 'url';
import VueLoaderPluginModule from 'vue-loader/dist/plugin.js'; // Rename to avoid confusion

// Extract the default export
const VueLoaderPlugin = VueLoaderPluginModule.default;

console.log('VueLoaderPlugin:', VueLoaderPlugin); // Debug what we’re importing

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/renderer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.vue'],
  },
};