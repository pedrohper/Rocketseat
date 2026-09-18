const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { loadEnvFile } = require('process');

/**
 * 💡 AULÃO GUANABARA - O que é o Webpack?
 * 
 * O Webpack é o nosso "Empacotador de Presentes" (Module Bundler).
 * Ele pega dezenas de arquivos JS, arquivos de estilo CSS e assets, transpilas com o Babel
 * e junta tudo em um único pacote super otimizado na pasta '/dist' para o navegador carregar sem travamento!
 */
module.exports = {
    target: "web",
    mode: "development",
    entry: path.resolve(__dirname, 'src', 'main.js'), // 🚪 Ponto de Entrada: onde tudo começa
    output: {
        path: path.resolve(__dirname, 'dist'),        // 📦 Ponto de Saída: pasta final do pacote
        filename: 'main.js'
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,
        open: true,       // Abre o navegador automaticamente ao rodar npm run dev!
        liveReload: true, // Recarrega a página sozinho sempre que você salva um arquivo!
    },
    plugins: [
        // HtmlWebpackPlugin: injeta a tag <script src="main.js"></script> no seu index.html de forma automática!
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            favicon: path.resolve(__dirname, 'src', 'assets', 'scissors.svg'),
        }),
        // CopyWebpackPlugin: copia imagens e ícones para a pasta final de build (dist)
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets'),
                    to: path.resolve(__dirname, 'dist', 'assets'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            // Regra 1: Permite importar arquivos .css direto dentro dos arquivos .js (ex: import "./styles/global.css")
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // Regra 2: Passa todo arquivo JavaScript pelo Babel para traduzir JS moderno para navegadores mais antigos
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { 
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }   
            }
        ]
    }
};