/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-10-12 00:15:34
 * @LastEditTime: 2023-10-12 01:48:01
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \note-taking-app\vite.config.js
 * 
 */
import legacy from '@vitejs/plugin-legacy'
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  // const env = loadEnv(mode, process.cwd(), '')
  return {
    base: "/", // 部署在GitHub Pages需要加上base，詳見：https://cn.vitejs.dev/guide/static-deploy.html#github-pages
    // vite环境变量配置
    // define: {
    //   "CURRENT_ENV": JSON.stringify(env.CURRENT_ENV),
    // },

    server: {
      open: true,
      // proxy: {
      //   '/now': {
      //     target: 'https://test.com',
      //     changeOrigin: true,
      //     // secure: false, // 如果是https接口，需要配置这个参数 
      //   },
      // },
    },
    resolve: {
      alias: {
        '@': resolve('src'),//路径化名
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },

    plugins: [
      react(),
      /**
       * @description: vite自带的文件分割配置
       * @return {*}
       */
      {
        ...splitVendorChunkPlugin(),
        apply: 'build',
      },
      /**
       * @description: 图片压缩插件
       * @return {*}
       */
      {
        ...ViteImageOptimizer({
          /* pass your config */
        }),
        // enforce: 'pre',
        apply: 'build',
      },

      /**
       * @description: 生成gzip文件，使网页加载更快
       * @return {*}
       */
      {
        ...compression(
          // {
          //   deleteOriginalAssets: true,
          //   exclude: ["./public/**"]
          // }
        ),
        // enforce: 'post',
        apply: 'build',
      },
      /**
       * @description: 兼容旧版本浏览器
       * @return {*}
       */
      {
        ...legacy({
          targets: ['defaults'],
        }),
        apply: 'build',
      },

    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
    /**
     * @description: 打包时才调用
     * @return {*}
     */
    build: {

    },
  }
})
