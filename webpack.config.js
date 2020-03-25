const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //设置入口
    entry: path.join(__dirname,'./src/main.js'),
    //设置出口
    output:{
      path:path.join(__dirname,'./dist'),
      filename:'bundle.js',
    },
    //设置mode
    mode:'development',

   //在webpack中用module配置第三方加载器
    module:{
        rules:[
            {test:/\.vue$/,use:['vue-loader']},
            {test:/\.css$/,use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]},
            {test:/\.(jpg|png|jif|bmp|jpeg|ttf|woff)$/,use:'url-loader'},//处理图片路径的loader

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }
        ],
    },

    plugins: [
        new VueLoaderPlugin()
    ]
};