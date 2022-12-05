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
		},
		tpus: function (todo, ordo) {
			var orf = typeof ordo === 'function', tof = typeof todo === 'function';
			if (this.uncaught) this.uncaught = !orf;
			if (this.cleared) {
				this.pointer++;
				var hid = todo && todo.hidden;
				hid || (clearTimeout(this.lastDef), this.lastDef = null);
				try {
					this.lastErr === null ? tof && (
						this.lastRtn = this.doRtn(todo, this.lastRtn)
					) : orf && (
						hid && (clearTimeout(this.lastDef), this.lastDef = null),
						clearTimeout(this.lastErr), this.lastErr = null,
						this.lastRtn = this.doRtn(ordo, this.lastRtn)
					);
				} catch (errObj) { this.lastRtn = errObj, this.toss(errObj); }
			} else this.queueordo.push(ordo), this.queuetodo.push(todo);
		},
		then: function (todo, ordo) {
			if (!isProce(this)) return new Proce(null, null, true).then(todo, ordo);
			if (this.config.trap !== 'none') this.getBefore()[
				this.config.trap === 'all' ? 'trap' : 'supp'
			](ordo);
			return this.tpus(todo, ordo), this;
		},
		trap: function (ordo) {
			return this.then(null, ordo);
		},
		next: function (doexpr, ordo, config) {
			if (!isProce(this)) return new Proce(null, null, true).next(doexpr, ordo, config);
			if (typeof doexpr !== 'function') return this.then(doexpr, ordo).conf(config);
			var proc = new Proce(null, this.config.get(config)),
				cf = function () { return proc.act(doexpr, arguments); };
			return cf.hidden = true, this.then(cf, ordo), proc.before = this, proc.trap(ordo);
		},
		take: function (todo, ordo, depth) {
			typeof todo === 'number' ? (depth = todo) : typeof depth === 'undefined' && (depth = -1);
			var _this = this, testf, proc = new Proce(function (todo, ordo) {
				_this.then(testf = function (rtn) {
					isThenable(rtn) && depth-- !== 0 ? rtn.then(testf, ordo) : apply(todo, null, arguments);
				}, ordo);
			});
			return typeof todo === 'function' || typeof ordo === 'function' ? proc.then(todo, ordo) : proc;
		},
		getBefore: function (n) {
			return this.before ? n ? n.index[this.id] ? n : (
				n.push(this), n.index[this.id] = true, this.before.getBefore(n)
			) : this.before.getBefore(new ProceArray()) : n || new ProceArray();
		},
		setBefore: function (n) {
			if (n && (n.pointer || (n.pointer = 0)) !== n.length) return (this.before = n[n.pointer++]).setBefore(n);
			else delete this.before;
		},
		conf: function (config, ordo) {
			if (!isProce(this)) return new Proce(null, null, true).conf(config);
			var tcfg = this.config, cf = function (n) { return tcfg.set(config), n; }
			cf.hidden = true;
			return this.then(cf, ordo);
		},
		configAll: function (config) {
			return ConfigClass.configAll(config), this;
		}
	}
	pipe.Proce = Proce;

	function pipe() { }
	var proto = Proce.prototype;
	var pilist = [
		'then',
		'trap',
		'next',
		'conf',
		'configAll'
	];
	for (var i = pilist.length - 1; i >= 0; --i) pipe[pilist[i]] = proto[pilist[i]];
	pipe.emptyProce = function (config) {
		return new Proce(null, config)
	};
}());