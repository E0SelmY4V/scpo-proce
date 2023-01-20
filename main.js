/**
 * 幻想私社异步过程类
 * @version 1.10116.0
 * @license GPL-3.0-or-later
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
'use strict';
(function () {
	var notModule = typeof exports === 'undefined', voidArray = [];
	(pipe.notModule = notModule)
		? window.scpoProce = pipe
		: (module.exports = pipe);

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
		return typeof n === 'object' && n !== null && typeof n.then === 'function';
	}
	pipe.isThenable = isThenable;

	function isArrayLike(n) {
		return typeof n === 'object' && n !== null && isFinite(n.length);
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
			for (var i = this.length - 1; i >= 0; i--) tpus(this[i], todo, ordo);
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		supp: function (ordo) {
			for (var i = this.length - 1; i >= 0; i--) if (this[i].uncaught) tpus(this[i], null, ordo);
		},
		pointer: 0,
		index: null
	};
	ProceArray.prototype = [];
	for (var i in proto) ProceArray.prototype[i] = proto[i];
	pipe.ProceArray = ProceArray;

	function ConfigClass(n, proc) {
		for (var i in n) this[i] = n[i];
		if (typeof proc === 'object' && n !== null) this.proc = proc;
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
			if (typeof n !== 'object' || n === null) return this;
			for (var i in this) if (typeof n[i] === 'undefined' || n[i] === null) n[i] = this[i];
			return n;
		},
		trap: 'all',
		proc: null,
		todo: null,
		ordo: null
	};
	pipe.ConfigClass = ConfigClass;
	pipe.config = new ConfigClass();

	function doRtn(_t, expr, param) {
		if (_t.nmArg) return expr(param);
		else {
			_t.nmArg = true;
			return apply(expr, null, param);
		}
	}
	pipe.doRtn;

	function act(_t, doexpr, args) {
		var params = [
			function () { if (noClear) noClear = false, clear(_t, arguments); },
			function () { if (noClear) noClear = false, clear(_t, exeordo(_t, arguments)); }
		], noClear = true;
		if (args) for (var i = 0; i < args.length; i++) params.push(args[i]);
		try {
			var r = apply(doexpr, _t, params);
			return _t.config.trap !== 'none' && isThenable(r) && (typeof r.getBefore === 'function'
				? r.getBefore(new ProceArray())[
					_t.config.trap === 'all' ? 'trap' : 'supp'
				](params[1])
				: r.then(null, params[1])
			), _t.acted = true, r;
		} catch (errObj) { _t.acted = true; return params[1](errObj); }
	}
	pipe.act = act;

	function clear(_t, param) {
		var i = _t.pointer, q = _t.queuetodo, f = true;
		while (++i < q.length) if (typeof q[i] === 'function') {
			q[i].hidden || (f = false);
			try { param = doRtn(_t, q[i], param); }
			catch (errObj) { _t.pointer = i, param = exeordo(_t, errObj), i = _t.pointer; }
		}
		f && (_t.lastDef = setTimeout(function () {
			_t.then(_t.config.todo, _t.config.ordo);
		})), _t.lastRtn = param, _t.cleared = true;
	}
	pipe.clear = clear;

	function exeordo(_t, param) {
		var i = _t.pointer, q = _t.queueordo;
		while (++i < q.length) if (typeof q[i] === 'function') {
			_t.pointer = i;
			try { return doRtn(_t, q[i], param); }
			catch (errObj) { return exeordo(_t, errObj); }
		}
		return _t.pointer = i, toss(_t, _t.nmArg ? param : param[0]), param;
	}
	pipe.exeordo = exeordo;

	function toss(_t, errObj) {
		_t.lastErr = setTimeout(function () {
			if (_t.lastDef !== null) return toss(_t, errObj);
			else if (notModule && !window.console) throw errObj;
			else return console.error('scpo-proce Uncaught', errObj);
		});
	}
	pipe.toss = toss;

	function tpus(_t, todo, ordo) {
		var orf = typeof ordo === 'function', tof = typeof todo === 'function';
		if (_t.uncaught) _t.uncaught = !orf;
		if (_t.cleared) {
			_t.pointer++;
			var hid = todo && todo.hidden;
			hid || (clearTimeout(_t.lastDef), _t.lastDef = null);
			try {
				_t.lastErr === null ? tof && (
					_t.lastRtn = doRtn(_t, todo, _t.lastRtn)
				) : orf && (
					hid && (clearTimeout(_t.lastDef), _t.lastDef = null),
					clearTimeout(_t.lastErr), _t.lastErr = null,
					_t.lastRtn = doRtn(_t, ordo, _t.lastRtn)
				);
			} catch (errObj) { _t.lastRtn = errObj, toss(_t, errObj); }
		} else _t.queueordo.push(ordo), _t.queuetodo.push(todo);
	}
	pipe.tpus = tpus;

	function Proce(doexpr, config, cleared) {
		this.queuetodo = [], this.queueordo = [], this.config = new ConfigClass(config, this), this.id = getId();
		cleared ? this.cleared = true : typeof doexpr === 'function' && act(this, doexpr);
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
		then: function (todo, ordo) {
			if (!isProce(this)) return new Proce(null, null, true).then(todo, ordo);
			if (this.config.trap !== 'none') this.getBefore()[
				this.config.trap === 'all' ? 'trap' : 'supp'
			](ordo);
			return tpus(this, todo, ordo), this;
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		next: function (doexpr, ordo, config) {
			if (!isProce(this)) return new Proce(null, null, true).next(doexpr, ordo, config);
			if (typeof doexpr !== 'function') return this.then(doexpr, ordo).conf(config);
			var proc = new Proce(null, this.config.get(config)),
				cf = function () { return act(proc, doexpr, arguments); };
			return cf.hidden = true, this.then(cf, ordo), proc.before = this, proc.trap(ordo);
		},
		take: function (todo, ordo, depth) {
			typeof todo === 'number' ? (depth = todo) : (typeof depth === 'undefined' || depth === null) && (depth = -1);
			var _this = this, testf, proc = new Proce(function (todo, ordo) {
				_this.then(testf = function (rtn) {
					isThenable(rtn) && depth-- !== 0 ? rtn.then(testf, ordo) : apply(todo, null, arguments);
				}, ordo);
			});
			return typeof todo === 'function' || typeof ordo === 'function' ? proc.then(todo, ordo) : proc;
		},
		grab: function (doexpr, ordo, depth, config) {
			return this.take(depth).next(doexpr, ordo, config);
		},
		getBefore: function (n) {
			return this.before ? n ? n.index[this.id] ? n : (
				n.push(this), n.index[this.id] = true, this.before.getBefore(n)
			) : this.before.getBefore(new ProceArray()) : n || new ProceArray();
		},
		setBefore: function (n) {
			if (n && (n.pointer || (n.pointer = 0)) !== n.length) (this.before = n[n.pointer++]).setBefore(n);
			else delete this.before;
			return this;
		},
		conf: function (config, ordo) {
			if (!isProce(this)) return new Proce(null, null, true).conf(config);
			var tcfg = this.config, cf = function (n) { return tcfg.set(config), n; }
			cf.hidden = true;
			return this.then(cf, ordo);
		},
		configAll: function (config) {
			return ConfigClass.configAll(config), this;
		},
		todo: function () {
			var proc = new Proce(null, null, true);
			return proc.lastRtn = arguments, proc;
		},
		ordo: function () {
			var proc = new Proce(null, null, true);
			return proc.lastRtn = arguments, toss(proc, arguments[0]), proc;
		},
		all: function () {
			var l = getList(arguments), r = [[]], i = l.length, c = i;
			return new Proce(function (todo, ordo) {
				while (--i >= 0) isThenable(l[i]) ? (function (i) {
					l[i].then(function () {
						var a = arguments, j = a.length;
						while (--j >= 0) (r[j] || (r[j] = []))[i] = a[j];
						if (--c === 0) apply(todo, null, r);
					}, ordo);
				})(i) : (--c, r[0][i] = l[i]);
				c || apply(todo, null, r);
			});
		},
		one: function () {
			var l = getList(arguments), noClear = true;
			return new Proce(function (todo, ordo) {
				for (var i = 0; i < l.length; i++)
					if (isThenable(l[i])) l[i].then(todo, ordo);
					else if (!this.acted) return todo(l[i]);
					else return;
			});
		},
		snake: function () {
			var l = getList(arguments), _this = this;
			return new Proce(function (todo, ordo) {
				for (var i = 0; i < l.length; i++) _this = _this.next(l[i], ordo);
				_this.then(todo, ordo);
			});
		}
	};
	var voidP = Proce.prototype.todo;
	pipe.Proce = Proce;

	function pipe(doexpr, config) {
		return typeof doexpr === 'function'
			? new Proce(doexpr, config)
			: apply(voidP, null, arguments);
	}
	var proto = Proce.prototype;
	var pilist = [
		'then',
		'trap',
		'next',
		'conf',
		'configAll',
		'todo',
		'ordo',
		'snake',
		'all',
		'one'
	];
	for (var i = pilist.length - 1; i >= 0; --i) pipe[pilist[i]] = proto[pilist[i]];
	pipe.emptyProce = function (config) {
		return new Proce(null, config)
	};
}());