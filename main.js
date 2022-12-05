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

	var m = false, z = 0, f = 1;
	function getId() {
		return (m = !m) ? z-- : f++;
	}
	pipe.getId = getId;

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

	function Proce(doexpr, config, cleared) {
		this.queuetodo = [], this.queueordo = [], this.config = new ConfigClass(config, this), this.id = getId();
		cleared ? this.cleared = true : typeof doexpr === 'function' && this.act(doexpr);
	}
	Proce.prototype = {
		id: NaN,
		queuetodo: null,
		queueordo: null,
		cleared: false,
		acted: false,
		nmArg: false,
		lastRtn: [],
		lastErr: null,
		lastDef: null,
		config: null,
		pointer: -1,
		before: null,
		uncaught: true,
		doRtn: function (expr, param) {
			if (this.nmArg) return expr(param);
			else {
				this.nmArg = true;
				return apply(expr, null, param);
			}
		},
		act: function (doexpr, args) {
			var t = this, params = [
				function () { if (noClear) noClear = false, t.clear(arguments); },
				function () { if (noClear) noClear = false, t.clear(t.exeordo(arguments)); }
			], noClear = true;
			if (args) for (var i = 0; i < args.length; i++) params.push(args[i]);
			try {
				var r = apply(doexpr, this, params);
				return this.config.trap !== 'none' && isThenable(r) && (typeof r.getBefore === 'function'
					? r.getBefore(new ProceArray())[
						this.config.trap === 'all' ? 'trap' : 'supp'
					](params[1])
					: r.then(null, params[1])
				), this.acted = true, r;
			} catch (errObj) { this.acted = true; return params[1](errObj); }
		},
		clear: function (param) {
			var i = this.pointer, q = this.queuetodo, f = true, t = this;
			while (++i < q.length) if (typeof q[i] === 'function') {
				q[i].hidden || (f = false);
				try { param = this.doRtn(q[i], param); }
				catch (errObj) { this.pointer = i, param = this.exeordo(errObj), i = this.pointer; }
			}
			f && (this.lastDef = setTimeout(function () {
				t.then(t.config.todo, t.config.ordo);
			})), this.lastRtn = param, this.cleared = true;
		},
		exeordo: function (param) {
			var i = this.pointer, q = this.queueordo;
			while (++i < q.length) if (typeof q[i] === 'function') {
				this.pointer = i;
				try { return this.doRtn(q[i], param); }
				catch (errObj) { return this.exeordo(errObj); }
			}
			return this.pointer = i, this.toss(this.nmArg ? param : param[0]), param;
		},
		toss: function (errObj) {
			var t = this;
			this.lastErr = setTimeout(function () {
				if (t.lastDef !== null) return t.toss(errObj);
				else if (isBrowser && !window.console) throw errObj;
				else return console.error('scpo-proce Uncaught', errObj);
			});
		}
	}
	pipe.Proce = Proce;

	function pipe() { }
}());