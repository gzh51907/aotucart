const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry:"./src/index.js",
    output:{
        path:path.join( __dirname,'./dist'),
        filename:'bundle-[name]-[hash:5].js',
        // publicPath:'./'
    },
    devServer:{
        contentBase:path.join(__dirname,'./src')
    },
    resolve:{
        alias:{
            '@':path.resolve('src'),
            '@@':path.resolve('src/pages')
        },
        extensions:['.js','.jsx']
    },
    //加载器loader
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                use:[{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-react']
                    }
                }]
                // loader:['babel-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
        ]
    },

    //插件
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/template.html'
        })
    ]
} 