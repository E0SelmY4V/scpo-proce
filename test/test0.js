const { join } = require('path');
require('ie-passer')['default']([
	join(__dirname, '../main.js'),
	join(__dirname, 'tool.js'),
], require('./test').test);