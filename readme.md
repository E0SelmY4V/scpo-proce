# Scpos Process

[简体中文](readme-zh.md) | **English**

The full name of *scpoProce* is *Scpos Process*, which is a super high-level Promise-like class for saving the asynchronous problem that has bothered the member of Scpos for about two million years. The inspiration of this super high-level class is the `Promise` in es6.
With the `await/async`, the convenience it brings can be more violent and stimulating.

The *Scpos Process* can not only run under Node.js, but also be used in HTML page development.
The oldest browser it support is IE5 (ES3).

## Import

- ### NodeJS

  ```javascript
  const scpoProce = require('scpo-proce');
  // Or
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

## Tips

- The behavior of *Scpos Process* is different from ES6 `Promise`. `ScpoProce.then` is Not a microtask like `Promise.then`. Sometimes, callbacks in `ScpoProce.then` are more like being executed synchronically.

  ```javascript
  setTimeout(() => console.log(1));

  new Promise((resolve) => {
    console.log(2);
    resolve();
  }).then(() => {
    console.log(3);
  });

  console.log(4);

  // Promise.then is a microtask.
  // The output will be "2431".
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

  // Just like sync, not a microtask.
  // The output will be "2341".
  ```

## Experience After Use

- Pretty convenient.
- Quite magical because of its enigmatic performance that seems even better than ES6 `Promise`.
- Troubling when my callback throwing the error, because there are too many *scpoProce*'s function in the error tracking log.

  I don't know how the `Promise` solve this problem.
  Maybe `Promise` is achieved by the engine rather than JS codes.

## More

- In fact, this project is made by [*Scpos Web-Request*](https://github.com/E0SelmY4V/scpo-webreq).
  If you are doing HTML development, The *Scpos Web-Request* is the better choice, including the delivery of parameter that more eerie, the preset configuration that more comprehensive and so on.

  (But it haven't updated for about two hundred years.)
