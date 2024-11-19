const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Usa 'production' per la build finale
  entry: './src/ui.js', // File di ingresso principale
  output: {
    filename: 'ui.bundle.js', // File JavaScript generato
    path: path.resolve(__dirname, 'dist'), // Directory di output
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // Processa i file CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Nome del file CSS generato
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080', // Usa un'origine specifica
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      'Access-Control-Allow-Credentials': 'true', // Permette le credenziali
    },
  },
};