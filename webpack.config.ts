import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import VueLoaderPlugin from "vue-loader/dist/pluginWebpack5";

export default {
  entry: ["@babel/polyfill", "./src/main.ts"],
  module: {
    rules: [
      {
        test: /\.css|sass|scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.ts|js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    // 将 tsconfig 中配置的路径别名映射到 webpack.resolve.alias 上
    // 在 .vue 文件中可以通过诸如 @/components/xxx.vue 的形式来引入组件
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // 全局注入 Vue, 避免在每个 .vue 文件中重复引入
    new Webpack.ProvidePlugin({
      Vue: ['vue/dist/vue.esm.js', 'default'],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html", // 自定义 HTML 模板
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    port: 8888,
    compress: true,
    hot: true,
    clientLogLevel: "silent",
    noInfo: true,
  },
} as Webpack.Configuration;
