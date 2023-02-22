import {
	SntXcrNum,
	Accur,
	ArrayLtdSplited,
	Transposed,
} from 'accurtype'
declare namespace t {
	import S = scpoProce
	type lu<T, R extends any[] = []> = T extends readonly [infer K, ...infer T1] ? lu<T1, [...R, S.ProceArgs<K>]> : []
	type le<T> = T extends readonly [infer K, ...infer T1] ? S.ProceErrs<K> | le<T1> : never
	type tf<T1, R, W> = S.CbNor<T1 extends S.Proce<infer P, infer E> ? W extends 0 ? P : E : W extends 0 ? [] : [any], R, any[]>
	// type sf<F, P extends any[], A extends any[]> = SnakeRslt<[CbNxt<F extends CbNxt<infer K> ? K : any[], P>, ...A]>
	// type sm<B extends any[], E1 extends any[], F, A extends any[]> = SnakeList<B, E1> | [F, ...A]
	// type st<B extends any[], E1 extends any[]> = Proce<B extends [...any[], infer K] ? K : any[], E1>
	type sn<T> = S.Proce<T extends readonly S.CbNxt<infer P1>[] ? P1 : any[], T extends readonly S.CbNxt<any[], any[], infer E1>[] ? E1 : [any]> extends S.Proce<infer P, infer E> ? S.Proce<P, E> : S.Proce
}
declare global {
	namespace scpoProce {
		/**类型参数 {@link T} 作为数组时的第一个元素，或 `undefined` */
		type First<T> = T extends [infer S, ...any[]] ? S : undefined
		/**以 {@link P} 和 {@link T} 为参数列表，以 {@link R} 为返回值的函数 */
		type CbNor<P extends readonly any[] = any[], R = any, T extends readonly any[] = []> = (...arg: [...P, ...T]) => R
		/**以 {@link P} 为异步结果，以 {@link E} 为异步异常，以 {@link R} 为返回值的异步执行器，类似 {@link PromiseConstructor|`Promise`} 的 `executor` 参数 */
		type CbCur<P extends readonly any[] = any[], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>], R, any[]>
		/**在 {@link CbCur|`CbCur`} 的基础上还以 {@link P0} 为上次异步的结果，作为连续异步的执行器 */
		type CbNxt<P extends readonly any[] = any[], P0 extends readonly any[] = [], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>, ...P0], R, any[]>
		/**或有或无计时器 */
		type STimer = ReturnType<typeof setTimeout> | null
		/**`ArrayLike<T> | ArrayLike<any>` 中的 `ArrayLike<any>` 或 `T`，其中 `T` 为可选类型参数 {@link T} */
		type ListGot<L, T = any[]> = L extends ArrayLike<any> ? L[0] extends T ? L[0] : L : L
		/**`T[] | [T[], ...any[]]` 中的 `T[]` */
		type ListArrGot<L extends readonly any[]> = [L[0]] extends [readonly any[]] ? L[0] : L
		/**是否在裸浏览器环境下 */
		const notModule: boolean
		/**是否有 {@link Object.keys|`Object.keys`} 方法可以用 */
		const hasObject_keys: boolean
		/**用来区分 {@link scpoProce|`scpoProce`} 和 {@link Proce|`Proce` 实例} */
		const isPipe: true
		/**以数组形式的参数 {@link p} 调用函数 {@link f} */
		function apply<P extends any[], R>(f: (...param: [...P]) => R, p: P): R
		/**判断 {@link n} 是否是 {@link PromiseLike|`Thenable`} */
		function isThenable(n: any): n is PromiseLike<any>
		/**判断 {@link n} 是否是 {@link ArrayLike|`ArrayLike`} */
		function isArrayLike(n: any): n is ArrayLike<any>
		/**{@link ArrayLike|`ArrayLike`} 转 {@link Array|`Array`} */
		function arrayFrom<T>(n: ArrayLike<T>): T[]
		/**得到 `ArrayLike<T> | ArrayLike<ArrayLike<T>>` 中的 `ArrayLike<T>` */
		function getList<N>(list: N): ListGot<N, ArrayLike<any>>
		/**任意 {@link Proce|`Proce`} 实例 */
		type ProceN = Proce<readonly any[], readonly any[]>
		/**{@link T} 作为 {@link Proce|`Proce`} 时的异步结果，或 `[T]` */
		type ProceArgs<T> = T extends Proce<infer A, readonly any[]> ? A : [T]
		/**{@link T} 作为 {@link Proce|`Proce`} 时的异步异常，或 `[]` */
		type ProceErrs<T> = T extends Proce<readonly any[], infer A> ? A : []
		/**以 {@link T} 为长度的 {@link Proce|`Proce`} 元组 */
		type ProceFilled<T extends number, A extends readonly ProceN[] = []> = T extends 0 ? A : ProceFilled<SntXcrNum<9, T, number>, [ProceN, ...A]>
		/**以 {@link D} 为最大深度，从以 {@link P} 为异步结果，以 {@link E} 为异步异常的 {@link Proce|`Proce`} 中提取得到的 {@link Proce|`Proce`} */
		type ProceTaked<P extends readonly any[], E extends readonly any[], D extends number = -1> = D extends 0 ? Proce<P, E> : P extends readonly [Proce<infer PI, infer EI>, ...any[]] ? (number extends D ? Proce<P, E> : never) | ProceTaked<PI, EI | E, SntXcrNum<9, D, number>> : Proce<P, E>
		// type SnakeList<T extends any[][], E extends any[] = [any]> = T extends [infer P0 extends any[], infer P extends any[], ...infer K extends any[]] ? [CbNxt<P, P0, E>, ...SnakeList<[P, ...K], E>] : []
		// type SnakeRslt<T extends any[], F = 0> = T extends [CbNxt<infer P, infer S>, ...infer K extends any[]] ? [...(F extends 0 ? [S, P] : [P]), ...SnakeRslt<K, 1>] : [];
		/**以 {@link Proce.prototype.one|`Proce#one`} 的形式处理的异步结果 */
		type OnedArgs<T extends readonly any[]> = T extends readonly (infer K)[] ? ProceArgs<K> : never;
		/**以 {@link Proce.prototype.all|`Proce#all`} 的形式处理的异步结果 */
		type UedProce<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? [...t.lu<T0>, ...([ProceArgs<S>] extends [never] ? [] : ProceArgs<S>[]), ...t.lu<T2>] : []
		/**多 {@link Proce|`Proce`} 工具。包含 {@link Proce.prototype.one|`Proce#one`}、{@link Proce.prototype.all|`Proce#all`}、{@link Proce.prototype.snake|`Proce#snake`} */
		type InterProceTool = Proce['one' | 'all' | 'snake']
		/**以 {@link InterProceTool|多 `Proce` 工具} 的形式处理的异步异常 */
		type UedProceE<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? t.le<T0> | ProceErrs<S> | t.le<T2> : []
		/**获取 ID */
		function getId(): number
		/**执行 {@link _t} 的单个回调 */
		function doRtn<R, T extends ProceN, P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, expr: CbNor<P, R>, param: P | P[0] | E | E[0]): R
		/**执行 {@link _t} 的异步执行器 */
		function act<R, T extends ProceN, R0 extends readonly any[] = [], P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, doexpr: CbNxt<P, R0, E, R> | CbCur<P, E, R>, args: R0): void
		/**执行 {@link _t} 的回调列表 */
		function clear<T extends ProceN, P extends readonly any[] = ProceArgs<T>>(_t: T, param: P | P[0]): void
		/**为 {@link _t} 使用异常捕获回调处理异常 */
		function exeordo<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, param: E | E[0]): any
		/**为 {@link _t} 异步抛出未捕获的异常 */
		function toss<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, errObj: E[0]): void
		/**
		 * 异步过程类
		 *
		 * 类型参数 {@link P} 表示异步结果，类型参数 {@link E} 表示异步异常
		 */
		class Proce<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
			/**以 {@link doexpr} 为异步操作的执行器，以 {@link config} 为配置，得到一个异步过程类。若 {@link cleared} 为 `true` 则得到一个已经完成的异步过程类且不会执行 {@link doexpr} */
			constructor(doexpr?: CbCur<P, E>, config?: Config<P, E>, cleared?: boolean)
			/**异步执行器接受的 `todo` 参数 (类似 {@link PromiseConstructor|`Promise`} 的 `executor` 参数的 `resolve` 参数) */
			ftodo: CbNor<P, void>
			/**异步执行器接受的 `ordo` 参数 (类似 {@link PromiseConstructor|`Promise`} 的 `executor` 参数的 `reject` 参数) */
			fordo: CbNor<E, void>
			/**回调列表 */
			queuetodo: readonly CbNor<P>[]
			/**异常捕获回调列表 */
			queueordo: readonly CbNor<E>[]
			/**是否已完成异步过程 */
			cleared: boolean
			/**是否已开始异步过程，或者说是否已执行完异步执行器 */
			acted: boolean
			/**是否不可能有多个结果，或者说是否已经执行过至少一个回调 */
			nmArg: boolean
			/**结果或异常 */
			lastRtn: P | First<P> | E | First<E>
			/**异常抛出计时器 */
			lastErr: STimer
			/**{@link Config.todo|默认回调} 或 {@link Config.ordo|默认异常捕获回调} 的调用计时器 */
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
			/**以 {@link depth} 为最大深度提取 {@link P} 里的 {@link Proce|`Proce`} */
			take<D extends number = -1>(depth?: D): ProceTaked<P, E, D>
			/**提取到 {@link Proce|`Proce`} 之后给其添加回调和异常捕获回调 */
			take<RT, RO = RT, D extends number = -1, T1 = ProceTaked<P, E, D>>(todo: t.tf<T1, RT, 0>, ordo?: t.tf<T1, RO, 1>, depth?: D): Proce<[RT | RO]>
			/**提取到 {@link Proce|`Proce`} 之后接着其开启第二次异步 */
			grab<P1 extends readonly any[], E1 extends readonly any[], D extends number = -1, PT extends readonly any[] = ProceTaked<P, E, D> extends Proce<infer P, readonly any[]> ? P : P>(doexpr?: CbNxt<P1, PT, E1>, ordo?: CbNor<E1, any, any[]>, depth?: D, config?: Config<P1, E1>): Proce<P1, E1>
			/**修改配置 */
			conf<E1>(config?: ConfigN, ordo?: CbNor<E, E1, any[]>): Proce<[], [E1]>
			/**@see {@link ConfigClass.configAll|`ConfigClass.configAll`} */
			configAll(n?: ConfigN): Proce<P, E>
			/**@see {@link todo|`scpoProce.todo`} */
			todo: typeof todo
			/**@see {@link ordo|`scpoProce.ordo`} */
			ordo: typeof ordo
			/**@see {@link snake|`scpoProce.snake`} */
			snake: typeof snake
			/**@see {@link one|`scpoProce.one`} */
			one: typeof one
			/**@see {@link all|`scpoProce.all`} */
			all: typeof all
		}
		/**得到一个添加了回调和异常捕获回调的 {@link Proce|`Proce`} 实例 */
		function then<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>): Proce<[RT], E1>
		/**得到了一个添加了异常捕获回调 {@link Proce|`Proce`} 实例 */
		function trap(ordo?: CbNor<[]>): Proce<[], []>
		/**开启异步 */
		function next<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, config?: Config<P1, E1>): Proce<P1, E1>
		/**什么用也没有 */
		function take(depth?: number): Proce<[], []>
		/**@see {@link then|`scpoProce.then`} */
		function take<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>, depth?: number): Proce<[RT], E1>
		/**@see {@link next|`scpoProce.next`} */
		function grab<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, depth?: number, config?: Config<P1, E1>): Proce<P1, E1>
		/**得到一个修改了配置的 {@link Proce|`Proce`} 实例 */
		function conf<E1>(config?: ConfigN, ordo?: CbNor<[], E1, any[]>): Proce<[], [E1]>
		/**@see {@link ConfigClass.configAll|`ConfigClass.configAll`} */
		function configAll(n?: ConfigN): Proce<[], []>
		/**得到一个以 {@link n} 为异步结果的已经完成的 {@link Proce|`Proce`} 实例 */
		function todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
		/**得到一个以 {@link n} 为未捕获异步错误的已经完成的 {@link Proce|`Proce`} 实例 */
		function ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
		/**异步一个接一个 */
		function snake<T extends readonly CbNxt[] | CbNxt, N extends T[]>(...n: [...N]): t.sn<ListArrGot<N>>
		/**得到数组中最快完成的 {@link Proce|`Proce`} 的异步结果 */
		function one<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<OnedArgs<ListArrGot<N>>, UedProceE<ListArrGot<N>>>
		/**得到数组中所有 {@link Proce|`Proce`} 的异步结果 */
		function all<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<Transposed<UedProce<ListArrGot<N>>>, UedProceE<ListArrGot<N>>>
		/**
		 * {@link Proce|`Proce`} 配置
		 *
		 * 类型参数 {@link P} 表示异步结果，类型参数 {@link E} 表示异步异常
		 */
		interface Config<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
			/**
			 * 是否捕获异步执行器返回的 {@link PromiseLike|`Thenable`} 的异常
			 * @default true
			 */
			actTrap?: boolean | null
			/**
			 * 未捕获异常处理等级
			 * - `"ignore"` 啥都不干
			 * - `"log"` 使用 {@link console.error|`console.error`} 提示异常
			 * - `"throw"` 抛出异常，可能导致意外终止
			 * @default 'log'
			 */
			errlv?: 'log' | 'throw' | 'ignore' | null
			/**
			 * 默认回调
			 * @default null
			 */
			todo?: CbNor<P> | null
			/**
			 * 默认异常捕获回调
			 * @default null
			 */
			ordo?: CbNor<E> | null
		}
		/**任意 {@link Config|`Proce` 配置} */
		type ConfigN = Config<readonly any[], readonly any[]>
		/**{@link Proce|`Proce`} 配置类 */
		class ConfigClass<P extends readonly any[] = any[], E extends readonly any[] = [any]> implements Config<P, E> {
			constructor(n: Config<P, E>, proc?: Proce<P, E>)
			/**修改全局默认配置，也就是修改配置类的原型属性 */
			static configAll(n?: ConfigN): void
			/**修改自己的配置 */
			set<P1 extends readonly any[], E1 extends readonly any[]>(n?: Config<P1, E1>): ConfigClass<P1, E1>
			/**以 {@link n} 为主，使用自己补充，得到一个新的 {@link ConfigClass|`Proce` 配置类} */
			get<P1 extends readonly any[], E1 extends readonly any[]>(n?: Config<P1, E1>): ConfigClass<P1, E1>
			todo?: Config<P, E>['todo']
			ordo?: Config<P, E>['ordo']
			actTrap: {} & ConfigN['actTrap']
			errlv: {} & ConfigN['errlv']
		}
		/**任意 {@link ConfigClass|`Proce` 配置类} */
		type ConfigClassN = ConfigClass<readonly any[], readonly any[]>
		/**可以执行异步执行器的东西 */
		type Nxtable = ProceN | typeof scpoProce
	}
	/**
	 * 幻想私社异步过程类
	 * @version 2.10124.0
	 * @license GPL-3.0-or-later
	 * @link https://github.com/E0SelmY4V/scpo-proce
	 */
	function scpoProce<P extends readonly any[], E extends readonly any[] = [any]>(doexpr: scpoProce.CbCur<P, E>, config?: scpoProce.Config<P, E>): scpoProce.Proce<P, E>
	function scpoProce<A extends Accur<A>, P extends A[]>(...arg: P): scpoProce.Proce<P, []>
}
