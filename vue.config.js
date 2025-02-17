const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/": {
        changeOrigin: true,
        // target: "http://8.134.10.8:8090", // 代理目标的基础路径
        target: "http://localhost:8090", // 代理目标的基础路径
      },
    },
  },
});
