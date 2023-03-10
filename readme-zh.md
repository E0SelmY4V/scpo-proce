# 幻想私社过程类

**简体中文** | [English](readme.md)

scpoProce 全称 Scpos Process，即为幻想私社用以解决困扰社员二百万年的高深异步编程问题而开发的一个跨时代的类：幻想私社过程类。
本项目灵感来源于 ES6 的`Promise`，可用来减小异步编程带来的复杂性。
还可配合`await/async`，方便程度更上一层楼。

本项目既可用于 Node.js 的开发，也可用于前端 HTML 页面中的脚本，最高可兼容 IE5（也就是 ES3 ）。

## 引入

- ### NodeJS

  ```javascript
  const scpoProce = require('scpo-proce');
  // 或
  import scpoProce from 'scpo-proce';
  ```

- ### HTML

  ```html
  <!--[if IE]><script src="scpo-proce/es3.js"><![endif]-->
  <script src="scpo-proce/main.js"></script>
  <!--[if IE]></script><![endif]-->
  ```

  ```js
  /// <reference path="scpo-proce/global.d.ts" />

  console.log(scpoProce);
  ```

## 使用提示

- 本项目有些地方与 ES6 `Promise` 不同。
  例如 `Promise.then` 是一个微任务，但本项目的 `ScpoProce.then` 不是。
  有时候放在 `ScpoProce.then` 里的回调会像被同步执行一样。

  ```javascript
  setTimeout(() => console.log(1));

  new Promise((resolve) => {
    console.log(2);
    resolve();
  }).then(() => {
    console.log(3);
  });

  console.log(4);

  // Promise.then 是异步微任务
  // 控制台输出 2431
  ```

  ```javascript
  import scpoProce from 'scpo-proce';

  setTimeout(() => console.log(1));

  scpoProce((resolve) => {
    console.log(2);
    resolve();
  }).then(() => {
    console.log(3);
  });

  console.log(4);

  // scpoProce.then 不是微任务
  // 控制台输出 2341
  ```

## 使用感想

- 挺方便。
- 性能貌似比`Promise`高啊，有点神奇，也不知道为什么。
- 回调抛出错误时，错误追踪里有太多异步类相关的函数，看不清到底哪里出错了。`Promise`就不会出现这个问题，可能因为它不是用 JS 代码实现的吧。

## 其他

- 本项目其实是把 [Scpos Web-Request](https://github.com/E0SelmY4V/scpo-webreq) 的代码加强后制作而成的。
  如果你是编写 HTML 文档，建议使用对网络请求支持更多的 Scpos Web-Request，其中包括更诡异的参数传递、更全面的的预设配置等。

  （但是已经二百年没更新过了）
