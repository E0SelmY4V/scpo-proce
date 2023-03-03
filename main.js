/**
 * 幻想私社异步过程类
 * @version 2.10124.0
 * @license GPL-3.0-or-later
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
'use strict';
(function () {
	function pipe(doexpr, config) {
		if (typeof doexpr === 'function') return new Proce(doexpr, config);
		var proc = new Proce(null, null, true);
		proc.lastRtn = arguments;
		return proc;
	}
	pipe.isPipe = true;

	var notModule = pipe.notModule = typeof module === 'undefined';
	var hasObject_keys = pipe.hasObject_keys = typeof Object !== 'undefined' && typeof Object.keys === 'function';
	var voidArray = [];

	function apply(f, p) {
		switch (p.length) {
			case 0: return f();
			case 1: return f(p[0]);
			case 2: return f(p[0], p[1]);
			case 3: return f(p[0], p[1], p[2]);
			default: return f.apply(null, p);
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

	function ConfigClass(n) {
		if (n && n._isProceConfig) return n;
		this.set(n);
	}
	ConfigClass.configAll = function (n) {
		for (var i in n) ConfigClass.prototype[i] = n[i];
	};
	ConfigClass.prototype = {
		set: hasObject_keys
			? function (n) {
				for (var i in n) this[i] = n[i];
				return this;
			}
			: function (n) {
				this._seted || (this._seted = []);
				for (var i in n) this._seted.push(i), this[i] = n[i];
				return this;
			},
		get: hasObject_keys
			? function (n) {
				var r = new ConfigClass(n);
				var seted = Object.keys(this);
				if (!n) for (var i = seted.length - 1; i >= 0; --i) r[seted[i]] = this[seted[i]];
				else for (var i = seted.length - 1; i >= 0; --i) seted[i] in n || (r[seted[i]] = this[seted[i]]);
				return r;
			}
			: function (n) {
				var r = new ConfigClass(n);
				var seted = this._seted;
				if (!n) for (var i = seted.length - 1; i >= 0; --i) r[seted[i]] = this[seted[i]], r._seted.push(seted[i]);
				else for (var i = seted.length - 1; i >= 0; --i) seted[i] in n || (r[seted[i]] = this[seted[i]], r._seted.push(seted[i]));
				return r;
			},
		actTrap: true,
		errlv: 'log',
		todo: null,
		ordo: null,
		_seted: null,
		_isProceConfig: true
	};
	pipe.ConfigClass = ConfigClass;
	pipe.config = new ConfigClass();

	function doRtn(_t, expr, param) {
		return _t.nmArg ? expr(param) : (
			_t.nmArg = true,
			apply(expr, param)
		);
	}
	pipe.doRtn = doRtn;

	function act(_t, doexpr, args) {
		var params = [_t.ftodo, _t.fordo];
		if (args) for (var i = 0; i < args.length; i++) params.push(args[i]);
		try {
			var r = apply(doexpr, params);
			isThenable(r) && _t.config.actTrap && r.then(null, _t.fordo);
			_t.acted = true;
		} catch (errObj) { _t.acted = true; _t.fordo(errObj); }
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
		f && (_t.lastDef = setTimeout(function () { _t.then(_t.config.todo, _t.config.ordo); }));
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

	function Proce(doexpr, config, cleared) {
		this.queuetodo = [];
		this.queueordo = [];
		this.config = new ConfigClass(config);
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
			if (this.cleared) {
				this.pointer++;
				clearTimeout(this.lastDef);
				this.lastDef = null;
				try {
					this.lastErr === null ? typeof todo === 'function' && (
						this.lastRtn = doRtn(this, todo, this.lastRtn)
					) : typeof ordo === 'function' && (
						clearTimeout(this.lastErr), this.lastErr = null,
						this.lastRtn = doRtn(this, ordo, this.lastRtn)
					);
				} catch (errObj) { toss(this, this.lastRtn = errObj); }
			} else this.queueordo.push(ordo), this.queuetodo.push(todo);
			return this;
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		next: function (doexpr, ordo, config) {
			var _this = this;
			var proc = new Proce();
			this.then(function () {
				proc.config = _this.config.get(config);
				act(proc, doexpr, arguments);
			}, proc.fordo);
			return typeof ordo === 'function' ? proc.trap(ordo) : proc;
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
						: apply(todo, arguments);
				}, ordo);
			});
			return typeof todo === 'function' || typeof ordo === 'function' ? proc.then(todo, ordo) : proc;
		},
		grab: function (doexpr, ordo, depth, config) {
			return this.take(depth).next(doexpr, ordo, config);
		},
		conf: function (config) {
			if (this.isPipe) return new Proce(null, null, true).conf(config);
			var _this = this;
			return this.then(function () { _this.config = _this.config.get(config); });
		},
		configAll: function (config) {
			return this.then(function () { ConfigClass.configAll(config); });
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
						if (--c === 0) apply(todo, r);
					}, ordo);
				})(i) : (--c, r[0][i] = l[i]);
				c || apply(todo, r);
			});
		},
		one: function () {
			var l = getList(arguments);
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
				for (var i = 0; i < l.length; i++) _this = _this.next(l[i]);
				_this.then(todo, ordo);
			});
		}
	};
	Proce.prototype['catch'] = Proce.prototype.trap;
	pipe.Proce = Proce;

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
	notModule ? window.scpoProce = pipe : module.exports = pipe;
}());