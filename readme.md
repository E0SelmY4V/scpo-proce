# Scpos Process

[简体中文](readme-zh.md) | **English**

The full name of *scpoProce* is *Scpos Process*, which is a super high-level Promise-like class for saving the asynchronous problem that has bothered the member of Scpos for about two million years. The inspiration of this super high-level class is the `Promise` in es6.
With the `await/async`, the convenience it brings can be more violent and stimulating.

The *Scpos Process* can not only run under Node.js, but also be used in HTML page development.
The oldest browser it support is IE5.

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

## Import

- ### Common JS

  ```javascript
  const scpoProce = require('scpo-proce');
  ```

- ### Typescript

  ```ts
  import scpoProce = require('scpo-proce');
  ```

- ### ES Module

  ```javascript
  import scpoProce from 'scpo-proce';
  ```

- ### HTML

  ```html
  <script src="scpo-proce/main.js"></script>
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

## Demo

- ### Index

  - [Usual Async](#usual-async)
  - [Continuous Async](#continuous-async)
  - [Random-step Async](#random-step-async)
  - [Multiple-results Async](#multiple-results-async)

- ### Usual Async

  For this asynchronous operation:

  ```javascript
  async0(param, result => {
    // do something...

  });
  ```

  `Promise`:

  ```javascript
  new Promise((res, rej) => async0(param, res))
    .then(result => {
      // do something...

    })
    .catch(err => {
      console.log(err.message);
    });
  ```

  *Scpos Process*:

  ```javascript
  const scpoProce = require('scpo-proce');

  scpoProce((res, rej) => async0(param, res))
    .then(result => {
      // do something...

    })
    .trap(err => {
      console.log(err.message);
    });
  ```

- ### Continuous Async

  The difference between *Scpos Process* and `Promise` includes not only the compatibility of IE 6, but also the ability of doing the asynchronous operation in a row.

  For this asynchronous operation:

  ```javascript
  function main() {
    // do something...

    async0(param, result0 => {
      // do something...

      async1(param, result1 => {
        // do something...

        async2(param, result2 => {
          // do something...

          async3(param, result3 => {
          // do something...

          });
        });
      });
    });
  }

  main();
  ```

  It can looks like this if you use *Scpos Process*:

  ```javascript
  const scpoProce = require('scpo-proce');

  function main() {
    // do something...

    scpoProce(res => async0(param, res))
      .then(result0 => {
      // do something...

      })
      .next(res => async1(param, res))
      .then(result1 => {
      // do something...

      })
      .next(res => async2(param, res))
      .then(result2 => {
      // do something...

      })
      .next(res => async3(param, res))
      .then(result3 => {
      // do something...

      });
  }

  main();
  ```

  So many `next` may still not looking, so there is a simple method `scpoProce.snake()` which can also package these async operation into one async object to make the error catching easier.

  ```javascript
  const scpoProce = require('scpo-proce');

  function main() {
    scpoProce.snake((res, rej) => {
      // do something...

      async0(param, res);
    }, (res, rej, result0) => {
      // do something...

      async1(param, res);
    }, (res, rej, result1) => {
      // do something...

      async2(param, res);
    }, (res, rej, result2) => {
      // do something...

      async3(param, res);
    }, (res, rej, result3) => {
      // do something...

    }).trap(err => {
      console.log(err.message)
    });
  }

  main();
  ```

- ### Random-step Async

  The thorny async problems *Scpos Process* can resolve are more than usual async problems.

  For example, You want to judge whether the files in the list exist one by one, stopping the judgement and returning the name of file as soon as you find that files is exists, returning `false` if none of the files in the list exist.
  You may coding like this recursion:

  ```javascript
  const fs = require('fs');

  module.exports = (() => {
    let subCheck = (index, list, callback) =>
      (isntExist) => isntExist
        ? index === list.length - 1
          ? callback(false)
          : fs.access(list[++index], fs.constants.F_OK, subCheck(index, list, callback))
        : callback(list[index]);
    return (list, callback) => subCheck(-1, list, callback)(true);
  })();
  ```

  Or you can use `async/await`:

  ```javascript
  const fs = require('fs');
  const scpoProce = require('scpo-proce');

  module.exports = async (list, callback) => {
    for (let i = 0; i < list.length; i++) {
      if (await scpoProce(res =>
        fs.access(list[i], fs.constants.F_OK, isNoFile => res(!isNoFile))
      )) return callback(list[i]);
    }
    return callback(false);
  };
  ```

  Or using *Scpos Process* to resolve elegantly with one sentence:

  ```javascript
  const fs = require('fs');
  const scpoProce = require('scpo-proce');

  module.exports = (list, callback) => scpoProce.snake(list.map(file => (res, rej) => scpoProce(res => fs.access(list[i], fs.constants.F_OK, res)).then(isNoFile => isNoFile ? res() : rej(file)))).then(() => false, e => e).then(callback);
  ```

- ### Multiple-results Async

  To package `fs.readFile()` into a function that can called with `await`, usually, you may coding like this:

  ```javascript
  const fs = require('fs');

  function easyRead(file) {
    return new Promise(res => fs.readFile(file, 'utf-8', (err, data) => res(err ? null : data)));
  }
  ```

  Because the callback of `Promise` cannot take more than one parameter, we need to do a callback in the callback.

  Not very elegant.

  You can avoid this problem by using *Scpos Process*:

  ```javascript
  const fs = require('fs');
  const scpoProce = require('scpo-proce');

  function easyRead(file) {
    return scpoProce(res => fs.readFile(file, 'utf-8', res))
      .then((err, data) => err ? null : data);
  }
  ```

  Not only `than`, but also `scpoProce.snake()`, `scpoProce.all()`, `scpoProce.one()` can take many parameters, too.

  For example, `scpoProce.all()`, which like `Promise.all()`:

  ```javascript
  const scpoProce = require('scpo-proce');

  scpoProce.all(
    scpoProce(res => res('a', 'c')),
    scpoProce(res => res('b', 'd')),
  ).then(
    (r0, r1) => console.log(r0.join('') + r1.join(''))
  );
  ```

  The output of console is `abcd`.
