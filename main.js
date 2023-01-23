/**
 * 幻想私社异步过程类
 * @version 1.10120.1
 * @license GPL-3.0-or-later
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
'use strict';
(function () {
	var notModule = typeof module === 'undefined';
	var voidArray = [];
	(pipe.notModule = notModule)
		? window.scpoProce = pipe
		: module.exports = pipe;

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

	function arrayFrom(n) {
		var arr = [];
		for (var i = 0; i < n.length; i++) arr.push(n[i]);
		return arr;
	}
	pipe.arrayFrom = arrayFrom;

	function getList(list) {
		return isArrayLike(list[0]) ? list[0] : list;
	}
	pipe.getList = getList;

	var m = false;
	var z = -1;
	var f = 1;
	function getId() {
		return (m = !m) ? z-- : f++;
	}
	pipe.getId = getId;

	function ConfigClass(n, proc) {
		for (var i in n) this[i] = n[i];
		typeof proc === 'object' && n !== null && (this.proc = proc);
	}
	ConfigClass.configAll = function (n) {
		for (var i in n) ConfigClass.prototype[i] = n[i];
	};
	ConfigClass.prototype = {
		set: function (n) {
			for (var i in n) this[i] = n[i];
		},
		get: function (n) {
			if (typeof n !== 'object' || n === null) return this;
			for (var i in this) if (typeof n[i] === 'undefined' || n[i] === null) n[i] = this[i];
			return n;
		},
		trap: 'all',
		errlv: 'log',
		proc: null,
		todo: null,
		ordo: null
	};
	pipe.ConfigClass = ConfigClass;
	pipe.config = new ConfigClass();

	function doRtn(_t, expr, param) {
		return _t.nmArg ? expr(param) : (
			_t.nmArg = true,
			apply(expr, null, param)
		);
	}
	pipe.doRtn = doRtn;

	function act(_t, doexpr, args) {
		var params = [_t.ftodo, _t.fordo];
		if (args) for (var i = 0; i < args.length; i++) params.push(args[i]);
		try {
			var r = apply(doexpr, _t, params);
			_t.config.trap !== 'none' && isThenable(r) && r.then(null, params[1]);
			_t.acted = true;
			return r;
		} catch (errObj) { _t.acted = true; return params[1](errObj); }
	}
	pipe.act = act;

	function clear(_t, param) {
		var i = _t.pointer;
		var q = _t.queuetodo;
		var f = true;
		while (++i < q.length)
			if (typeof q[i] === 'function')
				try { param = doRtn(_t, q[i], param); }
				catch (errObj) { _t.pointer = i; param = exeordo(_t, errObj); i = _t.pointer; }
		f && (_t.lastDef = setTimeout(function () {
			_t.then(_t.config.todo, _t.config.ordo);
		}));
		_t.lastRtn = param;
		_t.cleared = true;
	}
	pipe.clear = clear;

	function exeordo(_t, param) {
		var i = _t.pointer;
		var q = _t.queueordo;
		while (++i < q.length)
			if (typeof q[i] === 'function') {
				_t.pointer = i;
				try { return doRtn(_t, q[i], param); }
				catch (errObj) { return exeordo(_t, errObj); }
			}
		_t.pointer = i;
		toss(_t, _t.nmArg ? param : param[0]);
		return param;
	}
	pipe.exeordo = exeordo;

	function toss(_t, errObj) {
		_t.lastErr = setTimeout(function () {
			if (_t.lastDef !== null) return toss(_t, errObj);
			switch (_t.config.errlv) {
				case 'throw': throw errObj;
				case 'log': typeof console !== 'undefined'
					? typeof console.error === 'function'
						? console.error('scpo-proce Uncaught', errObj)
						: typeof console.log === 'function' && console.log('scpo-proce Uncaught', errObj)
					: typeof alert === 'function' && alert((errObj || {}).message || errObj);
			}
		});
	}
	pipe.toss = toss;

	function tpus(_t, todo, ordo) {
		if (_t.cleared) {
			_t.pointer++;
			clearTimeout(_t.lastDef);
			_t.lastDef = null;
			try {
				_t.lastErr === null ? typeof todo === 'function' && (
					_t.lastRtn = doRtn(_t, todo, _t.lastRtn)
				) : typeof ordo === 'function' && (
					clearTimeout(_t.lastErr), _t.lastErr = null,
					_t.lastRtn = doRtn(_t, ordo, _t.lastRtn)
				);
			} catch (errObj) { toss(_t, _t.lastRtn = errObj); }
		} else _t.queueordo.push(ordo), _t.queuetodo.push(todo);
	}
	pipe.tpus = tpus;

	function Proce(doexpr, config, cleared) {
		this.queuetodo = [];
		this.queueordo = [];
		this.config = new ConfigClass(config, this);
		var noClear = true;
		var _t = this;
		cleared ? this.cleared = true : (
			this.ftodo = function () { noClear && (noClear = false, clear(_t, arguments)); },
			this.fordo = function () { noClear && (noClear = false, clear(_t, exeordo(_t, arguments))); },
			typeof doexpr === 'function' && act(this, doexpr)
		);
	}
	Proce.prototype = {
		ftodo: null,
		fordo: null,
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
		then: function (todo, ordo) {
			if (this.isPipe) return new Proce(null, null, true).then(todo, ordo);
			tpus(this, todo, ordo);
			return this;
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		next: function (doexpr, ordo, config) {
			if (this.isPipe) return new Proce(null, null, true).next(doexpr, ordo, config);
			if (typeof doexpr !== 'function') return this.then(doexpr, ordo).conf(config);
			var proc = new Proce(null, this.config.get(config));
			this.then(function () { return act(proc, doexpr, arguments); }, proc.fordo);
			return proc.trap(ordo);
		},
		take: function (todo, ordo, depth) {
			if (this.isPipe) return new Proce(null, null, true).take(todo, ordo, depth);
			typeof todo === 'number' ? depth = todo : typeof depth !== 'number' && (depth = -1);
			var _this = this;
			var testf;
			var proc = new Proce(function (todo, ordo) {
				_this.then(testf = function (rtn) {
					isThenable(rtn) && depth-- !== 0
						? rtn.then(testf, ordo)
						: apply(todo, null, arguments);
				}, ordo);
			});
			return typeof todo === 'function' || typeof ordo === 'function' ? proc.then(todo, ordo) : proc;
		},
		grab: function (doexpr, ordo, depth, config) {
			return this.take(depth).next(doexpr, ordo, config);
		},
		conf: function (config, ordo) {
			if (this.isPipe) return new Proce(null, null, true).conf(config);
			var tcfg = this.config;
			return this.then(function (n) { tcfg.set(config); return n; }, ordo);
		},
		configAll: function (config) {
			ConfigClass.configAll(config);
			return this;
		},
		todo: function () {
			var proc = new Proce(null, null, true);
			proc.lastRtn = arguments;
			return proc;
		},
		ordo: function () {
			var proc = new Proce(null, null, true);
			proc.lastRtn = arguments;
			toss(proc, arguments[0]);
			return proc;
		},
		all: function () {
			var l = getList(arguments);
			var r = [[]];
			var i = l.length;
			var c = i;
			return new Proce(function (todo, ordo) {
				while (--i >= 0) isThenable(l[i]) ? (function (i) {
					l[i].then(function () {
						var a = arguments;
						var j = a.length;
						while (--j >= 0) (r[j] || (r[j] = []))[i] = a[j];
						if (--c === 0) apply(todo, null, r);
					}, ordo);
				})(i) : (--c, r[0][i] = l[i]);
				c || apply(todo, null, r);
			});
		},
		one: function () {
			var l = getList(arguments);
			var noClear = true;
			return new Proce(function (todo, ordo) {
				for (var i = 0; i < l.length; i++)
					if (isThenable(l[i])) l[i].then(todo, ordo);
					else if (!this.acted) return todo(l[i]);
					else return;
			});
		},
		snake: function () {
			var l = getList(arguments);
			var _this = this;
			return new Proce(function (todo, ordo) {
				for (var i = 0; i < l.length; i++) _this = _this.next(l[i], ordo);
				_this.then(todo, ordo);
			});
		}
	};
	pipe.Proce = Proce;

	function pipe(doexpr, config) {
		if (typeof doexpr === 'function') return new Proce(doexpr, config);
		var proc = new Proce(null, null, true);
		proc.lastRtn = arguments;
		return proc;
	}
	pipe.isPipe = true;
	var proto = Proce.prototype;
	var pilist = [
		'then',
		'trap',
		'next',
		'take',
		'grab',
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