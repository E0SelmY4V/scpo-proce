# 使用场景

## 目录
- [使用场景](#使用场景)
	- [目录](#目录)
	- [普通的异步](#普通的异步)
	- [连续异步](#连续异步)
	- [不知道异步次数的连续异步](#不知道异步次数的连续异步)
	- [多参数回调](#多参数回调)

## 普通的异步

本项目有跟`Promise`差不多的用法。对于一个异步操作：

```javascript
async0(param, result => {
	// do something...

});
```

我们可以使用`Promise`：

```javascript
new Promise((res, rej) => async0(param, res))
	.then(result => {
		// do something...

	});
```

也可以使用`scpoProce`达到同样的效果：

```javascript
const scpoProce = require('scpo-proce');

scpoProce((res, rej) => async0(param, res))
	.then(result => {
		// do something...

	});
```

但本项目的功能不止于此。除了兼容到IE6，还与`Promise`有一个最大的区别：本项目包装了连续异步操作。

## 连续异步

对于一个连续异步操作：

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

使用本项目后：

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

		})
}

main();
```

一堆next可能还是不好看，所以还有一个简便函数`scpoProce.snake()`。此函数还可把这堆连续异步包装成一个异步过程，方便捕获错误：

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

	}).trap(err => console.log(err.message));
}

main();
```

## 不知道异步次数的连续异步

本项目可以解决的麻烦异步问题并不止于结构十分明显的异步程序。例如我们在编写node.js时可能会有这么一个需求：根据一个路径列表，挨个判断列表中的文件是否存在，若存在则输出文件路径并停止判断，若都不存在则输出`false`。

一般来说我们可能会编写如下代码：

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

这是个递归，实现的方法我们能看出来：若`subCheck()`函数发现文件存在或列表已经检查完毕，则会跳出递归，执行回调，否则将会继续调用自己进行路径的判断。为了防止异步过程中受到干扰，还要通过返回函数来传递函数的内部变量，而不是使用公共的变量。

我们还可以用`async/await`来实现：

```javascript
const fs = require('fs');
const scpoProce = require('scpo-proce');

module.exports = async (list, callback) => {
	for (let i = 0; i < list.length; i++) {
		if (await new Promise(res =>
			fs.access(list[i], fs.constants.F_OK, err => res(!err))
		)) return callback(list[i]);
	}
	return callback(false);
};
```

然而使用本项目之后，一行语句就可以解决：

```javascript
const fs = require('fs');
const scpoProce = require('scpo-proce');

module.exports = (list, callback) => scpoProce.snake(list.map(file => (res, rej) => scpoProce(res => fs.access(list[i], fs.constants.F_OK, res)).then(err => err ? res() : rej(file)))).then(() => false, e => e).then(callback);
```

## 多参数回调

本项目支持使用`async/await`。例如如果我们想把`fs.readFile()`包装为可以使用`await`的函数，我们一般会编写如下代码：

```javascript
const fs = require('fs');

function easyRead(file) {
	return new Promise(res => fs.readFile(file, 'utf-8', (err, data) => res(err ? null : data)));
}
```

由于`Promise`的回调函数无法接受一个以上的参数，我们只能通过在回调里插入回调，这个样子并不是特别优雅。使用本项目可以避免这一问题：

```javascript
const fs = require('fs');
const scpoProce = require('scpo-proce');

function easyRead(file) {
	return scpoProce(res => fs.readFile(file, 'utf-8', res))
		.then((err, data) => res(err ? null : data));
}
```

不仅是普通的`then`方法的回调可以获取多个参数，`scpoProce.snake()`、`scpoProce.all()`、`scpoProce.one()`等将多个异步包装成一个异步的方法也支持获取多个参数。例如类似`Promise.all()`的`scpoProce.all()`方法：

```javascript
const scpoProce = require('scpo-proce');

scpoProce.all(
	scpoProce(res => res('a', 'c')),
	scpoProce(res => res('b', 'd')),
).then(
	(r0, r1) => console.log(r0.join('') + r1.join(''))
);
```

输出`abcd`。