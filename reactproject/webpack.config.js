const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename:"[name].[chunkhash:8].js"//对js添加hash指纹
  },
  devServer: {
    contentBase: path.join(__dirname, "./src")
    // open:true
  },


  // 加载器
  module: {
    rules: [
      // js,jsx
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
          // options:{
          //     presets:['@babel/preset-react'],
          //     plugins:[
          //         ['@babel/plugin-proposal-decorators',{legacy: true}],
          //         ['@babel/plugin-proposal-class-properties',{ loose: true }],
          //         ["import", {
          //             "libraryName": "antd",
          //             "libraryDirectory": "es",
          //             "style": "css" // `style: true` 会加载 less 文件
          //           }]
          //     ]
          // }
        },
        include: path.resolve(__dirname, "./src")
      },
      {
        test: /\.(ico|png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          // include: "./src/img/[name].[ext]?[hash]", //../img是文件存储位置，name是文件名
          limit: 10000,
          name:'img/[name].[hash:8].[ext]'
        }
      },

      // css,sass
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    // 删除dist文件夹
    new CleanWebpackPlugin(),

    // 创建dist文件
    new HtmlWebpackPlugin({
      template: "./src/template.html"
      // filename:'index.html'
    })
  ],
  externals: {
    BMap: "BMap"
  }
};
