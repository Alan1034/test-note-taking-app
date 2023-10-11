/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-10-11 22:58:57
 * @LastEditTime: 2023-10-12 01:27:51
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \note-taking-app\src\main.tsx
 * 
 */
import { createRoot } from 'react-dom/client';
import App from "./app.js";
import "./style.css";
import React from 'react';

if (!document.getElementById("root")) {
  const div = document.createElement('div');
  div.id = "root";
  document.body.appendChild(div);
}
const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  // 渲染你的 React 组件
  root.render(<App />);
}
