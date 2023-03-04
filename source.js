/**
 * 幻想私社异步过程类
 * @version 2.10124.0
 * @license GPL-3.0-or-later
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
function pipe(doexpr, config) {
	if (typeof doexpr === 'function') return new Proce(doexpr, config);
	const proc = new Proce(null, null, true);
	proc.lastRtn = arguments;
	return proc;
};
pipe.isPipe = true;
const notModule = pipe.notModule = typeof module === 'undefined';
const hasObject_keys = pipe.hasObject_keys = typeof Object?.keys === 'function';
const errAbled = pipe.errAbled = typeof console === 'undefined' ? 'alert' : typeof console?.error === 'function' ? 'error' : typeof console?.log === 'function' ? 'log' : 'none';
const voidArray = [];
const apply = pipe.apply = (f, p) => {
	switch (p.length) {
		case 0: return f();
		case 1: return f(p[0]);
		case 2: return f(p[0], p[1]);
		case 3: return f(p[0], p[1], p[2]);
		default: return f.apply(null, p);
	}
};
const isThenable = pipe.isThenable = (n) => typeof n?.then === 'function';
const isArrayLike = pipe.isArrayLike = (n) => typeof n === 'object' && typeof n?.length === 'number';
const arrayFrom = pipe.arrayFrom = (n) => {
	const arr = [];
	for (let i = 0; i < n.length; i++) arr.push(n[i]);
	return arr;
};
const getList = pipe.getList = (list) => isArrayLike(list[0]) ? list[0] : list;
let m = false;
let z = -1;
let f = 1;
const getId = pipe.getId = () => (m = !m) ? z-- : f++;
const forIn = pipe.forIn = (a, b) => {
	for (const i in b) a[i] = b[i];
};

function ConfigClass(n) {
	if (n?._isProceConfig) return n;
	else return this.set(n);
}
ConfigClass.configAll = (n) => forIn(ConfigClass.prototype, n);
ConfigClass.prototype = {
	actTrap: true,
	errlv: 'log',
	todo: null,
	ordo: null,
	_isProceConfig: true,
	stopTrap: false,
};
forIn(ConfigClass.prototype, hasObject_keys ? {
	set(n) {
		forIn(this, n);
		return this;
	},
	get(n) {
		const r = new ConfigClass(n);
		const seted = Object.keys(this);
		if (!n) for (let i = seted.length - 1; i >= 0; --i) r[seted[i]] = this[seted[i]];
		else for (let i = seted.length - 1; i >= 0; --i) seted[i] in n || (r[seted[i]] = this[seted[i]]);
		return r;
	},
} : {
	set(n) {
		this._seted || (this._seted = []);
		for (const i in n) this._seted.push(i), this[i] = n[i];
		return this;
	},
	get(n) {
		const r = new ConfigClass(n);
		const seted = this._seted;
		if (!n) for (let i = seted.length - 1; i >= 0; --i) r[seted[i]] = this[seted[i]], r._seted.push(seted[i]);
		else for (let i = seted.length - 1; i >= 0; --i) seted[i] in n || (r[seted[i]] = this[seted[i]], r._seted.push(seted[i]));
		return r;
	},
	_seted: null,
});
pipe.ConfigClass = ConfigClass;
pipe.config = new ConfigClass();

const doRtn = pipe.doRtn = (_t, expr, param) => _t.nmArg ? expr(param) : (_t.nmArg = true, apply(expr, param));
const act = pipe.act = (_t, doexpr, args) => {
	const params = [_t.ftodo, _t.fordo];
	for (let i = 0; i < args?.length ?? 0; i++) params.push(args[i]);
	try {
		const r = apply(doexpr, params);
		isThenable(r) && _t.config.actTrap && r.then(null, _t.fordo);
		_t.acted = true;
	} catch (errObj) { _t.acted = true; _t.fordo(errObj); }
};
const clear = pipe.clear = (_t, param) => {
	const q = _t.queuetodo;
	let i = _t.pointer;
	let f = true;
	while (++i < q.length)
		if (typeof q[i] === 'function')
			try { param = doRtn(_t, q[i], param); }
			catch (errObj) { _t.pointer = i; param = exeordo(_t, errObj); i = _t.pointer; }
	f && (_t.lastDef = setTimeout(() => _t.then(_t.config.todo, _t.config.ordo)));
	_t.lastRtn = param;
	_t.cleared = true;
};
const exeordo = pipe.exeordo = (_t, param) => {
	const q = _t.queueordo;
	let i = _t.pointer;
	while (++i < q.length)
		if (typeof q[i] === 'function') {
			_t.pointer = i;
			try { return doRtn(_t, q[i], param); }
			catch (errObj) { return exeordo(_t, errObj); }
		}
	_t.pointer = i;
	toss(_t, _t.nmArg ? param : param[0]);
	return param;
};
const toss = pipe.toss = (_t, errObj) => {
	const temp = _t; // Why IE needs this line of code??
	temp.lastErr = setTimeout(() => {
		if (temp.lastDef !== null) return toss(temp, errObj);
		switch (temp.config.errlv) {
			case 'throw': throw errObj;
			case 'log': switch (errAbled) {
				case 'error': console.error('scpo-proce Uncaught', errObj);
				case 'log': console.log('scpo-proce Uncaught', errObj);
				case 'alert': try { alert(`scpo-proce Uncaught ${errObj?.message ?? errObj}`); } catch { }
			}
		}
	});
};

function Proce(doexpr, config, cleared) {
	this.queuetodo = [];
	this.queueordo = [];
	this.config = new ConfigClass(config);
	const _t = this;
	let noClear = true;
	cleared ? this.cleared = true : (
		this.ftodo = (...a) => noClear && (noClear = false, clear(_t, a)),
		this.fordo = (...a) => noClear && (noClear = false, clear(_t, exeordo(_t, a))),
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
	then(todo, ordo) {
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
	trap(ordo) {
		return this.then(null, ordo);
	},
	next(doexpr, ordo, config) {
		const _this = this;
		const proc = new Proce();
		const cfg = _this.config.get(config);
		this.then((...a) => (proc.config = cfg, act(proc, doexpr, a)), cfg.stopTrap || proc.fordo);
		return typeof ordo === 'function' ? proc.trap(ordo) : proc;
	},
	take(todo, ordo, depth) {
		if (this.isPipe) return new Proce(null, null, true).take(todo, ordo, depth);
		typeof todo === 'number' ? depth = todo : typeof depth !== 'number' && (depth = -1);
		const _this = this;
		const proc = new Proce((todo, ordo) => {
			const testf = (...a) => isThenable(a[0]) && depth-- !== 0
				? a[0].then(testf, ordo)
				: apply(todo, a);
			_this.then(testf, ordo);
		});
		return typeof todo === 'function' || typeof ordo === 'function' ? proc.then(todo, ordo) : proc;
	},
	grab(doexpr, ordo, depth, config) {
		return this.take(depth).next(doexpr, ordo, config);
	},
	conf(config) {
		if (this.isPipe) return new Proce(null, null, true).conf(config);
		const _this = this;
		return this.then(() => _this.config = _this.config.get(config));
	},
	configAll(config) {
		return this.then(() => ConfigClass.configAll(config));
	},
	todo() {
		const proc = new Proce(null, null, true);
		proc.lastRtn = arguments;
		return proc;
	},
	ordo() {
		const proc = new Proce(null, null, true);
		toss(proc, (proc.lastRtn = arguments)[0]);
		return proc;
	},
	all() {
		const l = getList(arguments);
		const r = [[]];
		let i = l.length;
		let c = i;
		return new Proce((todo, ordo) => {
			while (--i >= 0) isThenable(l[i])
				? ((i) =>
					l[i].then((...a) => {
						let j = a.length;
						while (--j >= 0) (r[j] || (r[j] = []))[i] = a[j];
						if (--c === 0) apply(todo, r);
					}, ordo)
				)(i)
				: (--c, r[0][i] = l[i]);
			c || apply(todo, r);
		});
	},
	one() {
		const l = getList(arguments);
		const proc = new Proce((todo, ordo) => {
			for (let i = 0; i < l.length; i++)
				if (isThenable(l[i])) l[i].then(todo, ordo);
				else if (!proc.acted) return todo(l[i]);
				else return;
		});
		return proc;
	},
	snake() {
		const l = getList(arguments);
		let _this = this;
		return new Proce((todo, ordo) => {
			for (let i = 0; i < l.length; i++) _this = _this.next(l[i]);
			_this.then(todo, ordo);
		});
	},
};
Proce.prototype[['ca', 'ch'].join('t')] = Proce.prototype.trap;
pipe.Proce = Proce;

const proto = Proce.prototype;
const pilist = [
	'then',
	'trap',
	'next',
	'take',
	'catch',
	'grab',
	'conf',
	'configAll',
	'todo',
	'ordo',
	'snake',
	'all',
	'one',
];
for (let i = pilist.length - 1; i >= 0; --i) pipe[pilist[i]] = proto[pilist[i]];
notModule ? window.scpoProce = pipe : module.exports = pipe;