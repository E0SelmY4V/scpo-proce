import { SntXcrNum, ArrayAccur } from 'accurtype'
export namespace scpoProce {
	type CbNor<P extends any[] = any[], R = any, T extends any[] = []> = (...arg: [...P, ...T]) => R
	type CbCur<P extends any[] = any[], E extends any[] = [any], R = any> = CbNor<[CbNor<P, void> | never, CbNor<E, void> | never], R, any[]>
	type CbNxt<P extends any[] = any[], P0 extends any[] = [], E extends any[] = [any], R = any> = CbNor<[CbNor<P, void> | never, CbNor<E, void> | never, ...P0], R, any[]>
	type STimer = number | null
	type ListGot<L, T = any[]> = L extends ArrayLike<any> ? L[0] extends T ? L[0] : L : L
	const isBrowser: boolean
	function apply<P extends any[], R>(f: (...param: P) => R, t: any, p: P): R
	function isThenable(n: any): n is PromiseLike<any>
	function isArrayLike(n: any): n is ArrayLike<any>
	function arrayFrom<T>(n: ArrayLike<T>): T[]
	function getList<T>(list: T): ListGot<T, ArrayLike<any>>
	type ProceN = Proce<any[], any[]>
	type ProceArgs<T> = T extends Proce<infer A, any[]> ? A : [T]
	type ProceFilled<T extends number, A extends ProceN[] = []> = T extends 0 ? A : ProceFilled<SntXcrNum<9, T, number>, [ProceN, ...A]>
	type ProceTaked<T, D extends number = -1> = D extends 0 ? T : T extends Proce<[infer F extends ProceN, ...any[]], any[]> ? ProceTaked<F, SntXcrNum<9, D, number>> : T
	type SnakeList<T extends any[][], E extends any[] = [any]> = T extends [infer P0 extends any[], infer P extends any[], ...infer K extends any[]] ? [CbNxt<P, P0, E>, ...SnakeList<[P, ...K], E>] : []
	type SnakeRslt<T extends any[], F = 0> = T extends [CbNxt<infer P, infer S>, ...infer K extends any[]] ? [...(F extends 0 ? [S, P] : [P]), ...SnakeRslt<K, 1>] : [];
	type OnedArgs<T extends any[]> = T extends [infer N, ...infer L] ? ProceArgs<N> | OnedArgs<L> : T extends [] ? never : T extends (infer K)[] ? ProceArgs<K> : never;
	function getId(): number
	class Proce<P extends any[] = any[], E extends any[] = [any]> {
		constructor(doexpr?: CbCur<P, E>, config?: Config, cleared?: boolean)
		id: number
		queuetodo: CbNor<P>[]
		queueordo: CbNor<E>[]
		cleared: boolean
		acted: boolean
		nmArg: boolean
		lastRtn: P | P[0] | E | E[0]
		lastErr: STimer
		lastDef: STimer
		config: ConfigClass
		pointer: number
		before?: ProceN
		uncaught: boolean
		doRtn<R>(expr: CbNor<P, R>, param: P | P[0] | E | E[0]): R
		act<R>(doexpr: CbCur<P, E, R>): R
		act<R, R0 extends any[] = []>(doexpr: CbNxt<P, R0, E, R> | CbCur<P, E, R>, args: R0): R
		clear(param: P | P[0]): void
		exeordo(param: E | E[0]): any
		toss: (errObj: E[0]) => void
		getBefore(n?: ProceArray): ProceArray
		setBefore(n: ProceArray | ProceN[]): void
		tpus<R>(todo?: CbNor<P, R>, ordo?: CbNor<E, R>): void
		then<R>(todo?: CbNor<P, R>, ordo?: CbNor<E, R>): Proce<[R]>
		trap<R>(ordo?: CbNor<E, R>): Proce<[R]>
		next<P1 extends any[], E1 extends any[], R>(doexpr?: CbNxt<P1, P, E1, R>, ordo?: CbNor<E1, R>, config?: Config): Proce<P1, E1>
		take<D extends number = -1>(depth?: D): t.tp<P, E, D>
		take<R, D extends number = -1, T1 = t.tp<P, E, D>>(todo: t.tf<T1, R, 0>, ordo?: t.tf<T1, R, 1>, depth?: D): Proce<[R]>
		conf<E1>(config?: Config, ordo?: CbNor<E, E1>): t.cp<P, E1>
		configAll(n?: Config): Proce<P, E>
		todo<P1 extends any[]>(...n: P1): Proce<P1, []>
		ordo<E1 extends any[]>(...n: E1): Proce<[], E1>
		snake(n?: []): Proce<P, E>
		snake<F extends CbNxt<any[], P>, A extends CbNxt[], E1 extends any[], B extends any[] = t.sf<F, P, A>>(n: t.sm<B, E1, F, A>): t.st<B, E1>
		snake<F extends CbNxt<any[], P>, A extends CbNxt[], E1 extends any[], B extends any[] = t.sf<F, P, A>>(...n: t.sm<B, E1, F, A>): t.st<B, E1>
		one<T extends ArrayAccur>(n: T): Proce<OnedArgs<T>, []>
		// all()
	}
	function then<R>(todo?: CbNor<[], R>, ordo?: CbNor<[], R>): Proce<[R]>
	function trap<R>(ordo?: CbNor<[], R>): Proce<[R]>
	function next<P1 extends any[], E1 extends any[], R>(doexpr?: CbNxt<P1, [], E1, R>, ordo?: CbNor<E1, R>, config?: Config): Proce<P1, E1>
	function conf<E1>(config?: Config, ordo?: CbNor<[], E1>): t.cp<[], E1>
	function configAll(): Proce<[], []>
	function todo<P1 extends any[]>(...n: P1): Proce<P1, []>
	function ordo<E1 extends any[]>(...n: E1): Proce<[], E1>
	function snake(n?: []): Proce<[], []>
	function snake<F extends CbNxt<any[], []>, A extends CbNxt[], E1 extends any[], B extends any[] = t.sf<F, [], A>>(n: t.sm<B, E1, F, A>): t.st<B, E1>
	function snake<F extends CbNxt<any[], []>, A extends CbNxt[], E1 extends any[], B extends any[] = t.sf<F, [], A>>(...n: t.sm<B, E1, F, A>): t.st<B, E1>
	function one<T extends ArrayAccur>(n: T): Proce<OnedArgs<T>, []>
	// function all()
	namespace t {
		type tp<P extends any[], E extends any[], D extends number> = ProceTaked<Proce<P, E>, D>
		type tf<T1, R, W> = CbNor<T1 extends Proce<infer P, infer E> ? W extends 0 ? P : E : W extends 0 ? [] : [any], R>
		type cp<P extends any[], E1> = Proce<P extends [] ? [] : [P[0]], [E1]>
		type sf<F, P extends any[], A extends any[]> = SnakeRslt<[CbNxt<F extends CbNxt<infer K> ? K : any[], P>, ...A]>
		type sm<B extends any[], E1 extends any[], F, A extends any[]> = SnakeList<B, E1> | [F, ...A]
		type st<B extends any[], E1 extends any[]> = Proce<B extends [...any[], infer K] ? K : any[], E1>
	}
	class ProceArray<P extends any[] = any[], E extends any[] = [any]> extends Array<Proce<P, E>> {
		constructor(...proce: Proce<P, E>[])
		then(todo?: CbNor<P>, ordo?: CbNor<E>): void
		trap(ordo?: CbNor<E>): void
		supp(ordo?: CbNor<E>): void
		index: { [id: number]: true }
		pointer: number
	}
	type Config = Omit<ConfigClass, 'get' | 'set'> | ConfigClass
	class ConfigClass<P extends any[] = any[], E extends any[] = [any]> {
		constructor(n: Config, proc?: Proce<P, E>)
		static configAll(n?: Config): void
		set(n?: Config): void
		get(n?: Config): Config
		trap: 'all' | 'no-trap' | 'none'
		proc?: Proce<P, E>
		todo?: CbNor<P>
		ordo?: CbNor<E>
	}
}
export function scpoProce<P extends any[], E extends any[] = [any]>(doexpr: scpoProce.CbCur<P, E>, config?: scpoProce.Config): scpoProce.Proce<P>
export function scpoProce<P extends any[]>(...arg: P): scpoProce.Proce<P, []>
export default scpoProce