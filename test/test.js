const scpoProce = require('scpo-proce');
const https = require('https');
const webReq = (url, callback) => https.get(url, res => {
	const list = [];
	res.on('data', chunk => list.push(chunk));
	res.on('end', () => callback(Buffer.concat(list).toString(), 123, 234));
});
const { testWebsite } = require('./tool');
const alert = console.log;
const test = {
	'错误捕获'() {
		const a = scpoProce((res, rej) => setTimeout(res, 200))
			.then(() => a(345))
			.then(() => alert(234), () => alet(123))
			.then(() => a(3210), 123)
			.then(() => alert(321), () => alert(456))
			.then(() => a(432));
		return a.trap(() => alert(543));
	},
	'多参数回调网络请求'() {
		return scpoProce(todo => webReq(testWebsite + "?=" + Math.random(), todo))
			.then((data, w) => alert(data + w));
	},
	'开门then'() {
		return scpoProce()
			.then(() => (alert("hh"), testWebsite + "?=" + Math.random()))
			.next((todo, ordo, url) => webReq(url, todo))
			.then((data, w) => alert(data + w));
	},
	'snake方法'() {
		return scpoProce.snake(
			(todo) => todo(testWebsite + "?=", Math.random()),
			(todo, ordo, url, randNum) => webReq(url + randNum, todo),
			(todo, ordo, data) => alert(data),
		);
	},
	'配置默认回调'() {
		scpoProce.configAll({
			todo: function (d) { alert(d); },
			ordo: function () { alert('err!'); }
		});
		scpoProce((res, rej) => setTimeout(res, 1000));
		return scpoProce(res => setTimeout(res, 1500));
	},
	'all方法'() {
		return scpoProce.all(
			scpoProce((todo) => setTimeout(todo, 1000)).then(() => 123),
			scpoProce((todo) => setTimeout(() => todo(234, 345), 2000)),
		).then((r0, r1) => alert(r0 + ' ' + r1));
	},
	'开门take'() {
		alert(scpoProce.take(0));
		alert(scpoProce.take());
		alert(scpoProce.take(() => 123));
	},
	'开门grab'() {
		return scpoProce.grab(todo => setTimeout(todo, 1000)).then(() => alert(123));
	},
	'配置传递'() {
		scpoProce.conf({
			todo: () => alert(123)
		}).next(todo => setTimeout(todo, 500));
	},
	'截断捕获链'() {
		scpoProce.configAll({ stopTrap: true });
		scpoProce(a => setTimeout(a, 200))
			.then(() => alet(1))
			.next(a => setTimeout(a, 200), null, { stopTrap: false })
			.then(() => alert(1), a => alert(123));
	}
};
module.exports = async () => {
	for (const i in test) {
		console.log('\033[43m ' + i + ' \033[0m');
		await test[i]().then(() => (
			console.groupEnd(i),
			console.log('')
		));
	}
};
module.exports.test = test;