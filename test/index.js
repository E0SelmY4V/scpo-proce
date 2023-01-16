const tester = require('export-tester');

tester({
	sign: "scpoProce",
	pack: 'scpo-proce',
	cfg: {
		ts: {
			cjsMod: true,
		},
	},
	// req: [],
	disp: {
		stat: false,
		path: false,
	},
}, {
	import() {
		log(scpoProce);
	}
})