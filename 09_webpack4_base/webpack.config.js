const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        contentBase: './dist',
        // 设置localhost端口
        port: 3002,
        // 自动打开浏览器
        open: false,
    },
    module:{
        rules:[
            {
                test:/\.js|jsx$/,
                use:'babel-loader',
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx','.json'],//表示，这几个文件的后缀名可以省略不写，会按照书写顺序来解析
        alias:{
            '@':path.join(__dirname,'./src')//这样，@就表示项目根目录中src的这一层路径
        }
    },

}