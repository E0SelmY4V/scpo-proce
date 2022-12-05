/**
 * 幻想私社异步过程类
 * @author E0SelmY4V
 * @version 1.1.2022112000
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
'use strict';
(function () {
	var isBrowser = typeof exports === 'undefined', voidArray = [];
	(pipe.isBrowser = isBrowser)
		? window.scpoProce = pipe
		: exports.scpoProce = exports['default'] = pipe;

	function apply(f, t, p) {
		switch (p.length) {
			case 0: return f.call(t);
			case 1: return f.call(t, p[0]);
			case 2: return f.call(t, p[0], p[1]);
			case 3: return f.call(t, p[0], p[1], p[2]);
			default: return f.apply(t, p);
		}
	}
	pipe.apply = apply;

	function isThenable(n) {
		return typeof n === 'object' && typeof n.then === 'function';
	}
	pipe.isThenable = isThenable;

	function isArrayLike(n) {
		return typeof n === 'object' && isFinite(n.length);
	}
	pipe.isArrayLike = isArrayLike;

	function isProce(n) {
		return n instanceof Proce;
	}
	pipe.isProce = isProce;

	function arrayFrom(n) {
		for (var arr = [], i = 0; i < n.length; i++) arr.push(n[i]);
		return arr;
	}
	pipe.arrayFrom = arrayFrom;

	function getList(list) {
		return isArrayLike(list[0]) ? list[0] : list;
	}
	pipe.getList = getList;

	function Proce(doexpr, config, cleared) { }

	function pipe() { }
}());