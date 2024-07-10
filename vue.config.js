const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/app": {
        target: "http://localhost:8090", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/app": "/ship" }, //代理服务器将请求地址转给真实服务器时会将 /api1 去掉
      },
    },
  },
});
