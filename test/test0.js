const { join } = require('path');
require('ie-passer')['default']([
	join(__dirname, '../es3.js'),
	join(__dirname, 'tool.js'),
], require('./test').test);