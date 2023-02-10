import * as path from "path";
import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
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
      // webpack5 内置了 asset 模块, 用来代替 file-loader & url-loader & raw-loader 处理静态资源
      {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[base]",
        },
      },
      {
        test: /\.txt|xlsx/,
        type: "asset",
        generator: {
          filename: "files/[base]",
        },
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
    // webpack 5 热模块自动导入
    // new Webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    // 全局注入 Vue, 避免在每个 .vue 文件中重复引入
    new Webpack.ProvidePlugin({
      Vue: ["vue/dist/vue.esm.js", "default"],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html", // 自定义 HTML 模板
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
} as Webpack.Configuration;
