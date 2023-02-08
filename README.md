## Webpack5 vue2.7

参考以下文章搭建

- https://juejin.cn/post/7005496893551673357

### 搭建过程

**安装对应依赖**

```bash
yarn add webpack webpack-dev-server -D
```

*`@/webpack.config.ts`*

```ts
import * as path from 'path';
import * as Webpack from 'webpack';

export default {
	plugins: [
        new Webpack.HotModuleReplacementPlugin(),
    ],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		open: true,
		port: 8888,
		compress: true,
		hot: true,
		clientLogLevel: 'silent',
		noInfo: true,
	},
} as Webpack.Configuration;
```

`@/packaage.json`

```ts
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config ./webpack.config.ts",
    "start": "cross-env NODE_ENV=development webpack serve",
    "serve": "yarn start",
  }
```

**集成 Html**

`@/webpack.config.ts`

```ts
import * as HtmlWebpackPlugin from "html-webpack-plugin";
```

```ts
    new HtmlWebpackPlugin({
      template: "src/index.html", // 自定义 HTML 模板
    }),
```

**集成 scss**

需要注意的是，使用 `node-sass` 时 `node-sass` `sass-loader` 版本需要对应上 `node` 版本

今后的主流方向是 `dart-sass`

```bash
yarn add -D sass sass-loader postcss mini-css-extract-plugin
```

`@/webpack.config.ts`

```ts
import MiniCssExtractPlugin from "mini-css-extract-plugin";
```

```ts
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
    ],
  },
```

**集成 babel ts**

安装依赖

```bash
yarn add -D @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-transform-runtime @babel/preset-env @babel/preset-typescript babel-loader typescript tsconfig-paths-webpack-plugin
```

`@babel/polyfill` `@babel/runtime` 需要安装到 `dependencies` 里，保证引用到生产环境而不是开发环境

```bash
yarn add @babel/polyfill @babel/runtime
```


