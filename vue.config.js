const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:8090", // 代理目标的基础路径
        changeOrigin: true,
      },
    },
  },
});
