const br = `
`;
(async () => {
	const { minify } = require('terser');
	const fs = require('fs');
	const fsp = require('fs/promises');
	const events = require('events');
	const readline = require('readline');
	const { transform } = require('@babel/core/lib/index');
	const tran = (s, o) => new Promise((r, e) => transform(s, o, (n, d) => n ? e(n) : r(d.code)));
	/**@type {import('terser').MinifyOptions} */
	const opt = {
		compress: true,
		mangle: true,
	};
	const sourceArr = [];
	const cmtArr = [];
	let r = (s) => s[0] === ' ' || s[0] === '/' ? cmtArr.push(s) : (r = (s) => sourceArr.push(s), r(s));
	await events.once(
		readline.createInterface(fs.createReadStream('./source.js')).on('line', r),
		'close',
	);
	const cmt = cmtArr.join(br) + br;
	const source = sourceArr.join(br);
	await fsp.writeFile('./main.js', cmt + (await minify(
		{
			'source.js': `(()=>{${source}})();`,
		},
		opt,
	)).code);
	await fsp.writeFile('./es3.js', cmt + (await minify(
		{
			'es3.js': `!function(){${await tran(source, {
				"presets": ["@babel/preset-env"],
			})}}();`
		},
		opt,
	)).code);
})();
