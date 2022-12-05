/**
 * 幻想私社异步过程类
 * @author E0SelmY4V
 * @version 1.1.2022112000
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
'use strict';
(function () {
	var isBrowser = typeof exports === 'undefined';
	(pipe.isBrowser = isBrowser)
		? window.scpoProce = pipe
		: exports.scpoProce = exports['default'] = pipe;

	function pipe() { }
}());