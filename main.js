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

	function ProceArray() {
		this.index = {};
	}
	var proto = {
		then: function (todo, ordo) {
			for (var i = this.length - 1; i >= 0; i--) this[i].tpus(todo, ordo);
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		supp: function (ordo) {
			for (var i = this.length - 1; i >= 0; i--) if (this[i].uncaught) this[i].tpus(null, ordo);
		},
		pointer: 0,
		index: null
	};
	ProceArray.prototype = [];
	for (var i in proto) ProceArray.prototype[i] = proto[i];
	pipe.ProceArray = ProceArray;

	function ConfigClass(n, proc) {
		for (var i in n) this[i] = n[i];
		if (typeof proc === 'object') this.proc = proc;
	}
	ConfigClass.configAll = function (n) {
		for (var i in n) ConfigClass.prototype[i] = n[i];
		Proce.prototype.uncaught = typeof ConfigClass.prototype.ordo !== 'function';
	};
	ConfigClass.prototype = {
		set: function (n) {
			for (var i in n) this[i] = n[i];
			this.proc.uncaught = typeof this.ordo !== 'function';
		},
		get: function (n) {
			if (typeof n !== 'object') return this;
			for (var i in this) if (typeof n[i] === 'undefined') n[i] = this[i];
			return n;
		},
		trap: 'all',
		proc: null,
		todo: null,
		ordo: null
	};
	pipe.ConfigClass = ConfigClass;
	pipe.config = new ConfigClass();

	function getList(list) {
		return isArrayLike(list[0]) ? list[0] : list;
	}
	pipe.getList = getList;

	function Proce(doexpr, config, cleared) { }

	function pipe() { }
}());