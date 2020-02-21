# webpack4-vue
基于webpack4搭建的vue 基础环境，该环境下可以同时启动多个项目

## 脚本命令
npm run dev:client // 启动本地开发

npm run build:client // 项目打包

## 注意事项
1、全局引用less/sass变量 需要修改build/utils的loaders判断条件，默认less