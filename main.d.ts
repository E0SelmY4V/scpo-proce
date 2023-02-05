import {
	SntXcrNum,
	Accur,
	ArrayLtdSplited,
	Transposed,
	SemiUnrequired,
} from 'accurtype'
declare namespace scpoProce {
	/**回调函数 */
	type CbNor<P extends readonly any[] = any[], R = any, T extends readonly any[] = []> = (...arg: [...P, ...T]) => R
	/**异步函数 */
	type CbCur<P extends readonly any[] = any[], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>], R, any[]>
	/**带上次异步返回值的异步函数 */
	type CbNxt<P extends readonly any[] = any[], P0 extends readonly any[] = [], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>, ...P0], R, any[]>
	/**或有或无计时器 */
	type STimer = ReturnType<typeof setTimeout> | null
	/**`ArrayLike<T> | ArrayLike<ArrayLike<T>>` 中的 `ArrayLike<T>` */
	type ListGot<L, T = any[]> = L extends ArrayLike<any> ? L[0] extends T ? L[0] : L : L
	/**`T[] | [T[], ...any[]]` 中的 `T[]` */
	type ListArrGot<L extends readonly any[]> = [L[0]] extends [readonly any[]] ? L[0] : L
	/**是否在裸浏览器环境下 */
	const notModule: boolean
	/**是否有 `Object.keys` 方法可以用 */
	const hasObject_keys: boolean
	/**以数组形式的参数调用函数 */
	function apply<P extends any[], R>(f: (...param: [...P]) => R, p: P): R
	/**判断是否是 Thenable */
	function isThenable(n: any): n is PromiseLike<any>
	/**判断是否是 ArrayLike */
	function isArrayLike(n: any): n is ArrayLike<any>
	/**ArrayLike 转 Array */
	function arrayFrom<T>(n: ArrayLike<T>): T[]
	/**得到 `ArrayLike<T> | ArrayLike<ArrayLike<T>>` 中的 `ArrayLike<T>` */
	function getList<T>(list: T): ListGot<T, ArrayLike<any>>
	/**任意 Proce 类 */
	type ProceN = Proce<readonly any[], readonly any[]>
	/**Proce 的结果参数 */
	type ProceArgs<T> = T extends Proce<infer A, readonly any[]> ? A : [T]
	/**Proce 的异常参数 */
	type ProceErrs<T> = T extends Proce<readonly any[], infer A> ? A : []
	/**特定长度的 Proce 数组 */
	type ProceFilled<T extends number, A extends readonly ProceN[] = []> = T extends 0 ? A : ProceFilled<SntXcrNum<9, T, number>, [ProceN, ...A]>
	/**指定深度地提取后的 Proce */
	type ProceTaked<P extends readonly any[], E extends readonly any[], D extends number = -1> = D extends 0 ? Proce<P, E> : P extends readonly [Proce<infer PI, infer EI>, ...any[]] ? (number extends D ? Proce<P, E> : never) | ProceTaked<PI, EI | E, SntXcrNum<9, D, number>> : Proce<P, E>
	// type SnakeList<T extends any[][], E extends any[] = [any]> = T extends [infer P0 extends any[], infer P extends any[], ...infer K extends any[]] ? [CbNxt<P, P0, E>, ...SnakeList<[P, ...K], E>] : []
	// type SnakeRslt<T extends any[], F = 0> = T extends [CbNxt<infer P, infer S>, ...infer K extends any[]] ? [...(F extends 0 ? [S, P] : [P]), ...SnakeRslt<K, 1>] : [];
	/**以 `Proce.prototype.one` 的形式处理的结果参数数组 */
	type OnedArgs<T extends readonly any[]> = T extends readonly (infer K)[] ? ProceArgs<K> : never;
	/**以 `Proce.prototype.all` 的形式处理的结果参数元组 */
	type LtdUedProce<T, R extends any[] = []> = T extends readonly [infer K, ...infer T1] ? LtdUedProce<T1, [...R, ProceArgs<K>]> : []
	/**以 `Proce.prototype.all` 的形式处理的结果参数数组 */
	type UedProce<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? [...LtdUedProce<T0>, ...([ProceArgs<S>] extends [never] ? [] : ProceArgs<S>[]), ...LtdUedProce<T2>] : []
	/**以多 Proce 工具的形式处理的异常参数元组 */
	type LtdUedProceE<T> = T extends readonly [infer K, ...infer T1] ? ProceErrs<K> | LtdUedProceE<T1> : never
	/**以多 Proce 工具的形式处理的异常参数数组 */
	type UedProceE<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? LtdUedProceE<T0> | ProceErrs<S> | LtdUedProceE<T2> : []
	/**获取 ID */
	function getId(): number
	/**执行单个回调 */
	function doRtn<R, T extends ProceN, P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, expr: CbNor<P, R>, param: P | P[0] | E | E[0]): R
	/**开始异步过程 */
	function act<R, T extends ProceN, R0 extends readonly any[] = [], P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, doexpr: CbNxt<P, R0, E, R> | CbCur<P, E, R>, args: R0): void
	/**执行回调列表 */
	function clear<T extends ProceN, P extends readonly any[] = ProceArgs<T>>(_t: T, param: P | P[0]): void
	/**使用异常捕获回调处理异常 */
	function exeordo<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, param: E | E[0]): any
	/**异步抛出未捕获的异常 */
	function toss<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, errObj: E[0]): void
	/**异步过程类 */
	class Proce<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
		constructor(doexpr?: CbCur<P, E>, config?: Config<P, E>, cleared?: boolean)
		/**异步函数接受的 todo (Promise 的 resolve) 参数 */
		ftodo: CbNor<P, void>
		/**异步函数接受的 ordo (Promise 的 reject) 参数 */
		fordo: CbNor<E, void>
		/**回调列表 */
		queuetodo: readonly CbNor<P>[]
		/**异常捕获回调列表 */
		queueordo: readonly CbNor<E>[]
		/**是否已结束异步过程 */
		cleared: boolean
		/**是否已开始异步过程 */
		acted: boolean
		/**是否有很多结果 */
		nmArg: boolean
		/**结果 */
		lastRtn: P | P[0] | E | E[0]
		/**异常 */
		lastErr: STimer
		/**判断是否使用配置中处理函数的计时器 */
		lastDef: STimer
		/**配置 */
		config: ConfigClass<P, E>
		/**回调处理到的位置 */
		pointer: number
		/**添加回调 */
		then<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<P, RT, any[]>): Proce<[RT], E1 | E>
		/**添加回调和异常捕获回调 */
		then<RT, RO = RT, E1 extends readonly any[] = [any]>(todo?: CbNor<P, RT, any[]>, ordo?: CbNor<E, RO, any[]>): Proce<[RT | RO], E1>
		/**添加异常捕获回调 */
		trap<RO, E1 extends readonly any[] = [any]>(ordo?: CbNor<E, RO, any[]>): Proce<P, E1> | Proce<[RO], E1>
		/**开启第二次异步 */
		next<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, P, E1>, ordo?: CbNor<E1, any, any[]>, config?: Config<P1, E1>): Proce<P1, E1>
		/**按深度提取 Proce */
		take<D extends number = -1>(depth?: D): ProceTaked<P, E, D>
		/**按深度提取到 Proce 之后给其添加回调和异常捕获回调 */
		take<RT, RO = RT, D extends number = -1, T1 = ProceTaked<P, E, D>>(todo: t.tf<T1, RT, 0>, ordo?: t.tf<T1, RO, 1>, depth?: D): Proce<[RT | RO]>
		/**按深度提取到 Proce 之后接着其开启第二次异步 */
		grab<P1 extends readonly any[], E1 extends readonly any[], D extends number = -1, PT extends readonly any[] = ProceTaked<P, E, D> extends Proce<infer P, readonly any[]> ? P : P>(doexpr?: CbNxt<P1, PT, E1>, ordo?: CbNor<E1, any, any[]>, depth?: D, config?: Config<P1, E1>): Proce<P1, E1>
		/**修改配置 */
		conf<E1>(config?: ConfigN, ordo?: CbNor<E, E1, any[]>): Proce<[], [E1]>
		/**修改全局默认配置 */
		configAll(n?: ConfigN): Proce<P, E>
		/**得到一个已经结束的 Proce */
		todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
		/**得到一个已经结束且带着未捕获错误的 Proce */
		ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
		/**异步一个接一个 */
		snake<T extends readonly CbNxt[] | CbNxt, N extends T[]>(...n: [...N]): t.sn<ListArrGot<N>>
		/**得到数组中最快结束的 Proce 的结果 */
		one<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<OnedArgs<ListArrGot<N>>, UedProceE<ListArrGot<N>>>
		/**得到数组中所有 Proce 的结果 */
		all<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<Transposed<UedProce<ListArrGot<N>>>, UedProceE<ListArrGot<N>>>
	}
	/**添加回调和异常捕获回调 */
	function then<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>): Proce<[RT], E1>
	/**添加异常捕获回调 */
	function trap(ordo?: CbNor<[]>): Proce<[], []>
	/**开启异步 */
	function next<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, config?: Config<P1, E1>): Proce<P1, E1>
	/**什么用也没有 */
	function take(depth?: number): Proce<[], []>
	/**添加回调和异常捕获回调 */
	function take<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>, depth?: number): Proce<[RT], E1>
	/**开启异步 */
	function grab<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, depth?: number, config?: Config<P1, E1>): Proce<P1, E1>
	/**得到一个修改了配置的 Proce */
	function conf<E1>(config?: ConfigN, ordo?: CbNor<[], E1, any[]>): Proce<[], [E1]>
	/**修改全局默认配置 */
	function configAll(n?: ConfigN): Proce<[], []>
	/**得到一个已经结束的 Proce */
	function todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
	/**得到一个已经结束且带着未捕获错误的 Proce */
	function ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
	/**异步一个接一个 */
	function snake<T extends readonly CbNxt[] | CbNxt, N extends T[]>(...n: [...N]): t.sn<ListArrGot<N>>
	/**得到数组中最快结束的 Proce 的结果 */
	function one<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<OnedArgs<ListArrGot<N>>, UedProceE<ListArrGot<N>>>
	/**得到数组中所有 Proce 的结果 */
	function all<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<Transposed<UedProce<ListArrGot<N>>>, UedProceE<ListArrGot<N>>>
	namespace t {
		type tf<T1, R, W> = CbNor<T1 extends Proce<infer P, infer E> ? W extends 0 ? P : E : W extends 0 ? [] : [any], R, any[]>
		// type sf<F, P extends any[], A extends any[]> = SnakeRslt<[CbNxt<F extends CbNxt<infer K> ? K : any[], P>, ...A]>
		// type sm<B extends any[], E1 extends any[], F, A extends any[]> = SnakeList<B, E1> | [F, ...A]
		// type st<B extends any[], E1 extends any[]> = Proce<B extends [...any[], infer K] ? K : any[], E1>
		type sn<T> = Proce<T extends readonly CbNxt<infer P1>[] ? P1 : any[], T extends readonly CbNxt<any[], any[], infer E1>[] ? E1 : [any]> extends Proce<infer P, infer E> ? Proce<P, E> : Proce
	}
	/**Proce 配置 */
	interface Config<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
		/**
		 * 是否捕获异步函数返回的 Thenable 的异常
		 * @default true
		 */
		actTrap?: boolean
		/**
		 * 未捕获异常处理等级
		 * - `"ignore"` 啥都不干
		 * - `"log"` 使用 `console.error` 提示异常
		 * - `"throw"` 抛出异常，可能导致意外终止
		 * @default 'log'
		 */
		errlv?: 'log' | 'throw' | 'ignore'
		/**
		 * 默认回调
		 * @default null
		 */
		todo?: CbNor<P>
		/**
		 * 默认异常处理回调
		 * @default null
		 */
		ordo?: CbNor<E>
	}
	/**任意 Proce 配置 */
	type ConfigN = Config<readonly any[], readonly any[]>
	/**Proce 配置类 */
	class ConfigClass<P extends readonly any[] = any[], E extends readonly any[] = [any]> implements Config<P, E> {
		constructor(n: Config<P, E>, proc?: Proce<P, E>)
		/**修改全局默认配置 */
		static configAll(n?: ConfigN): void
		/**修改自己的配置 */
		set<P1 extends readonly any[], E1 extends readonly any[]>(n?: Config<P1, E1>): ConfigClass<P1, E1>
		/**以传入参数为主，使用自己补充，得到一个新的 Proce 配置类 */
		get<P1 extends readonly any[], E1 extends readonly any[]>(n?: Config<P1, E1>): ConfigClass<P1, E1>
		todo?: CbNor<P>
		ordo?: CbNor<E>
		actTrap: boolean
		errlv: ConfigN['errlv'] & {}
	}
	/**任意 Proce 配置类 */
	type ConfigClassN = ConfigClass<readonly any[], readonly any[]>
	/**可以执行异步操作的东西 */
	type Nxtable = ProceN | typeof scpoProce
}
/**
 * 幻想私社异步过程类
 * @version 2.10124.0
 * @license GPL-3.0-or-later
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
declare function scpoProce<P extends readonly any[], E extends readonly any[] = [any]>(doexpr: scpoProce.CbCur<P, E>, config?: scpoProce.Config<P, E>): scpoProce.Proce<P, E>
declare function scpoProce<A extends Accur<A>, P extends A[]>(...arg: P): scpoProce.Proce<P, []>
export = scpoProce
