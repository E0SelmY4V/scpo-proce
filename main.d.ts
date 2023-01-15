import {
	SntXcrNum,
	Accur,
	ArrayLtdSplited,
	Transposed,
} from 'accurtype'
declare namespace scpoProce {
	type CbNor<P extends readonly any[] = any[], R = any, T extends readonly any[] = []> = (...arg: [...P, ...T]) => R
	type CbCur<P extends readonly any[] = any[], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>], R, any[]>
	type CbNxt<P extends readonly any[] = any[], P0 extends readonly any[] = [], E extends readonly any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>, ...P0], R, any[]>
	type STimer = number | null
	type ListGot<L, T = any[]> = L extends ArrayLike<any> ? L[0] extends T ? L[0] : L : L
	type ListArrGot<L extends readonly any[]> = [L[0]] extends [readonly any[]] ? L[0] : L
	const notModule: boolean
	function apply<P extends any[], R>(f: (...param: P) => R, t: any, p: P): R
	function isThenable(n: any): n is PromiseLike<any>
	function isArrayLike(n: any): n is ArrayLike<any>
	function arrayFrom<T>(n: ArrayLike<T>): T[]
	function getList<T>(list: T): ListGot<T, ArrayLike<any>>
	type ProceN = Proce<readonly any[], readonly any[]>
	type ProceArgs<T> = T extends Proce<infer A, readonly any[]> ? A : [T]
	type ProceErrs<T> = T extends Proce<readonly any[], infer A> ? A : []
	type ProceFilled<T extends number, A extends readonly ProceN[] = []> = T extends 0 ? A : ProceFilled<SntXcrNum<9, T, number>, [ProceN, ...A]>
	type ProceTaked<P extends readonly any[], E extends readonly any[], D extends number = -1> = D extends 0 ? Proce<P, E> : P extends readonly [Proce<infer PI, infer EI>, ...any[]] ? (number extends D ? Proce<P, E> : never) | ProceTaked<PI, EI | E, SntXcrNum<9, D, number>> : Proce<P, E>
	// type SnakeList<T extends any[][], E extends any[] = [any]> = T extends [infer P0 extends any[], infer P extends any[], ...infer K extends any[]] ? [CbNxt<P, P0, E>, ...SnakeList<[P, ...K], E>] : []
	// type SnakeRslt<T extends any[], F = 0> = T extends [CbNxt<infer P, infer S>, ...infer K extends any[]] ? [...(F extends 0 ? [S, P] : [P]), ...SnakeRslt<K, 1>] : [];
	type OnedArgs<T extends readonly any[]> = T extends readonly (infer K)[] ? ProceArgs<K> : never;
	type LtdUedProce<T> = T extends readonly [infer K, ...infer T1] ? [ProceArgs<K>, ...LtdUedProce<T1>] : []
	type UedProce<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? [...LtdUedProce<T0>, ...([ProceArgs<S>] extends [never] ? [] : ProceArgs<S>[]), ...LtdUedProce<T2>] : []
	type LtdUedProceE<T> = T extends readonly [infer K, ...infer T1] ? ProceErrs<K> | LtdUedProceE<T1> : never
	type UedProceE<T extends readonly any[]> = ArrayLtdSplited<T> extends readonly [infer T0, readonly (infer S)[], infer T2] ? LtdUedProceE<T0> | ProceErrs<S> | LtdUedProceE<T2> : []
	function getId(): number
	function doRtn<R, T extends ProceN, P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, expr: CbNor<P, R>, param: P | P[0] | E | E[0]): R
	function act<R, T extends ProceN, R0 extends readonly any[] = [], P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, doexpr: CbNxt<P, R0, E, R> | CbCur<P, E, R>, args: R0): R
	function clear<T extends ProceN, P extends readonly any[] = ProceArgs<T>>(_t: T, param: P | P[0]): void
	function exeordo<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, param: E | E[0]): any
	function toss<T extends ProceN, E extends readonly any[] = ProceErrs<T>>(_t: T, errObj: E[0]): void
	function tpus<RT, T extends ProceN, RO = RT, P extends readonly any[] = ProceArgs<T>, E extends readonly any[] = ProceErrs<T>>(_t: T, todo?: CbNor<P, RT, any[]>, ordo?: CbNor<E, RO, any[]>): void
	class Proce<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
		constructor(doexpr?: CbCur<P, E>, config?: Config, cleared?: boolean)
		id: number
		queuetodo: readonly CbNor<P>[]
		queueordo: readonly CbNor<E>[]
		cleared: boolean
		acted: boolean
		nmArg: boolean
		lastRtn: P | P[0] | E | E[0]
		lastErr: STimer
		lastDef: STimer
		config: ConfigClassN
		pointer: number
		before?: ProceN
		uncaught: boolean
		getBefore(n?: ProceArray): ProceArray
		setBefore(n?: ProceArray | readonly ProceN[]): Proce<P, E>
		then<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<P, RT, any[]>): Proce<[RT], E1 | E>
		then<RT, RO = RT, E1 extends readonly any[] = [any]>(todo?: CbNor<P, RT, any[]>, ordo?: CbNor<E, RO, any[]>): Proce<[RT | RO], E1>
		trap<RO, E1 extends readonly any[] = [any]>(ordo?: CbNor<E, RO, any[]>): Proce<P, E1> | Proce<[RO], E1>
		next<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, P, E1>, ordo?: CbNor<E1, any, any[]>, config?: Config): Proce<P1, E1>
		take<D extends number = -1>(depth?: D): ProceTaked<P, E, D>
		take<RT, RO = RT, D extends number = -1, T1 = ProceTaked<P, E, D>>(todo: t.tf<T1, RT, 0>, ordo?: t.tf<T1, RO, 1>, depth?: D): Proce<[RT | RO]>
		conf<E1>(config?: Config, ordo?: CbNor<E, E1, any[]>): t.cp<P, E1>
		configAll(n?: Config): Proce<P, E>
		todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
		ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
		snake<T extends readonly CbNxt[] | CbNxt, N extends T[]>(...n: [...N]): t.sn<ListArrGot<N>>
		one<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<OnedArgs<ListArrGot<N>>, UedProceE<ListArrGot<N>>>
		all<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<Transposed<UedProce<ListArrGot<N>>>, UedProceE<ListArrGot<N>>>
	}
	function then<RT, E1 extends readonly any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>): Proce<[RT], E1>
	function trap(ordo?: CbNor<[]>): Proce<[], []>
	function next<P1 extends readonly any[], E1 extends readonly any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, config?: Config): Proce<P1, E1>
	function conf<E1>(config?: Config, ordo?: CbNor<[], E1, any[]>): t.cp<[], E1>
	function configAll(): Proce<[], []>
	function todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
	function ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
	function snake<T extends readonly CbNxt[] | CbNxt, N extends T[]>(...n: [...N]): t.sn<ListArrGot<N>>
	function one<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<OnedArgs<ListArrGot<N>>, UedProceE<ListArrGot<N>>>
	function all<A extends Accur<A>, T extends A | readonly A[], N extends T[]>(...n: [...N]): Proce<Transposed<UedProce<ListArrGot<N>>>, UedProceE<ListArrGot<N>>>
	namespace t {
		type tf<T1, R, W> = CbNor<T1 extends Proce<infer P, infer E> ? W extends 0 ? P : E : W extends 0 ? [] : [any], R, any[]>
		type cp<P extends readonly any[], E1> = Proce<P extends readonly [] ? [] : P extends readonly [infer K, ...any[]] ? [K] : P, [E1]>
		// type sf<F, P extends any[], A extends any[]> = SnakeRslt<[CbNxt<F extends CbNxt<infer K> ? K : any[], P>, ...A]>
		// type sm<B extends any[], E1 extends any[], F, A extends any[]> = SnakeList<B, E1> | [F, ...A]
		// type st<B extends any[], E1 extends any[]> = Proce<B extends [...any[], infer K] ? K : any[], E1>
		type sn<T> = Proce<T extends readonly CbNxt<infer P1>[] ? P1 : any[], T extends readonly CbNxt<any[], any[], infer E1>[] ? E1 : [any]> extends Proce<infer P, infer E> ? Proce<P, E> : Proce
	}
	class ProceArray<P extends readonly any[] = any[], E extends readonly any[] = [any]> extends Array<Proce<P, E>> {
		constructor(...proce: Proce<P, E>[])
		then(todo?: CbNor<P, any[]>, ordo?: CbNor<E, any[]>): void
		trap(ordo?: CbNor<E, any[]>): void
		supp(ordo?: CbNor<E, any[]>): void
		index: { [id: number]: true }
		pointer: number
	}
	type Config = Omit<ConfigClass, 'get' | 'set'> | ConfigClass
	type ConfigClassN = ConfigClass<readonly any[], readonly any[]>
	class ConfigClass<P extends readonly any[] = any[], E extends readonly any[] = [any]> {
		constructor(n: Config, proc?: Proce<P, E>)
		static configAll(n?: Config): void
		set(n?: Config): void
		get(n?: Config): Config
		trap: 'all' | 'no-trap' | 'none'
		proc?: Proce<P, E>
		todo?: CbNor<P>
		ordo?: CbNor<E>
	}
	type Nxtable = ProceN | typeof scpoProce
}
/**
 * 幻想私社异步过程类
 * @version 1.01220.20
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
declare function scpoProce<P extends readonly any[], E extends readonly any[] = [any]>(doexpr: scpoProce.CbCur<P, E>, config?: scpoProce.Config): scpoProce.Proce<P, E>
declare function scpoProce<A extends Accur<A>, P extends A[]>(...arg: P): scpoProce.Proce<P, []>
export = scpoProce
