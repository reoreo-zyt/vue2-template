// 配合 Webpack.ProvidePlugin 使用, 前面已配置好了
import Vue from "vue";
declare global {
  const Vue: typeof Vue;
}
