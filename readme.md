# Scpos Process

[简体中文](readme-zh.md) | **English**

The full name of *scpoProce* is *Scpos Process*, which is a super high-level Promise-like class for saving the asynchronous problem that has bothered the member of Scpos for about two million years. The inspiration of this super high-level class is the `Promise` in es6.
With the `await/async`, the convenience it brings can be more violent and stimulating.

The *Scpos Process* can not only run under Node.js, but also be used in HTML page development.
The oldest browser it support is IE6.

## Installation

- ### npm

  Install through npm,

  ```bash
  npm install scpo-proce
  ```

- ### git

  or you can clone the repo to the local.

  ```bash
  git clone https://github.com/E0SelmY4V/scpo-proce.git
  ```

## Usage

- ### CommonJS

  The CommonJS module, like Node.js, "require" like this:

  ```javascript
  const { scpoProce } = require('scpo-proce');
  // or
  var scpoProce = require('scpo-proce')["default"];
  ```

  [View example](test0.js)

- ### ES6

  If you are using ES module, you can:

  ```javascript
  import scpoProce from 'scpo-proce';
  ```

  [View example](test1.ts)

- ### HTML

  For the HTML:

  ```html
  <script src="scpo-proce/main.js"></script>
  ```

  And then, you can use it through `window.scpoProce` or `scpoProce`.

  [View example](test2.hta)

## Demo

- [Click here!](demo.md)

## Tips

- You can take a look at the source code before use.
- That's all.

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
