const { scpoProce } = require('..');
const https = require('https');
const webReq = (url, callback) => https.get(url, res => {
	const list = [];
	res.on('data', chunk => list.push(chunk));
	res.on('end', () => callback(Buffer.concat(list).toString(), 123, 234));
});
const { testWebsite } = require('./tool');
const alert = console.log;
const test = {
	['错误捕获']() {
		const a = scpoProce((res, rej) => setTimeout(res, 200))
			.then(() => a(345))
			.then(() => alert(234), () => alet(123))
			.then(() => a(3210), 123)
			.then(() => alert(321), () => alert(456))
			.then(() => a(432));
		return a.trap(() => alert(543));
	},
	['多参数回调网络请求']() {
		return scpoProce(todo => webReq(testWebsite + "?=" + Math.random(), todo))
			.then((data, w) => alert(data + w));
	},
	['开门then']() {
		return scpoProce()
			.then(() => (alert("hh"), testWebsite + "?=" + Math.random()))
			.next((todo, ordo, url) => webReq(url, todo))
			.then((data, w) => alert(data + w));
	},
	['snake方法']() {
		return scpoProce.snake(
			(todo) => todo(testWebsite + "?=", Math.random()),
			(todo, ordo, url, randNum) => webReq(url + randNum, todo),
			(todo, ordo, data) => alert(data),
		);
	},
	['配置默认回调']() {
		// scpoProce.configAll({
		// 	todo: function (d) { alert(d); },
		// 	ordo: function () { alert('err!'); }
		// });
		scpoProce((res, rej) => setTimeout(res, 1000))
			.conf({ todo: () => alert(123) });
		return scpoProce(res => setTimeout(res, 1500));
	},
	['all方法']() {
		return scpoProce.all(
			scpoProce((todo) => setTimeout(todo, 1000)).then(() => 123),
			scpoProce((todo) => setTimeout(() => todo(234), 2000)),
		).then((rslt) => alert(rslt));
	},
};
module.exports = async () => {
	for (const i in test) {
		console.group(i);
		await test[i]().then(() => (
			console.groupEnd(i),
			console.log('')
		));
	}
};
module.exports.test = test;