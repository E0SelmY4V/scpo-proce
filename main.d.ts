import {
	SntXcrNum,
	Accur,
	ArrayLtdSplited,
	Transposed,
} from 'accurtype'
export namespace scpoProce {
	type CbNor<P extends any[] = any[], R = any, T extends any[] = []> = (...arg: [...P, ...T]) => R
	type CbCur<P extends any[] = any[], E extends any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>], R, any[]>
	type CbNxt<P extends any[] = any[], P0 extends any[] = [], E extends any[] = [any], R = any> = CbNor<[CbNor<P, void>, CbNor<E, void>, ...P0], R, any[]>
	type STimer = number | null
	type ListGot<L, T = any[]> = L extends ArrayLike<any> ? L[0] extends T ? L[0] : L : L
	const notModule: boolean
	function apply<P extends any[], R>(f: (...param: P) => R, t: any, p: P): R
	function isThenable(n: any): n is PromiseLike<any>
	function isArrayLike(n: any): n is ArrayLike<any>
	function arrayFrom<T>(n: ArrayLike<T>): T[]
	function getList<T>(list: T): ListGot<T, ArrayLike<any>>
	type ProceN = Proce<any[], any[]>
	type ProceArgs<T> = T extends Proce<infer A, any[]> ? A : [T]
	type ProceErrs<T> = T extends Proce<any[], infer A> ? A : []
	type ProceFilled<T extends number, A extends ProceN[] = []> = T extends 0 ? A : ProceFilled<SntXcrNum<9, T, number>, [ProceN, ...A]>
	type ProceTaked<P extends any[], E extends any[], D extends number = -1> = D extends 0 ? Proce<P, E> : P extends [Proce<infer PI, infer EI>, ...any[]] ? (number extends D ? Proce<P, E> : never) | ProceTaked<PI, EI | E, SntXcrNum<9, D, number>> : Proce<P, E>
	// type SnakeList<T extends any[][], E extends any[] = [any]> = T extends [infer P0 extends any[], infer P extends any[], ...infer K extends any[]] ? [CbNxt<P, P0, E>, ...SnakeList<[P, ...K], E>] : []
	// type SnakeRslt<T extends any[], F = 0> = T extends [CbNxt<infer P, infer S>, ...infer K extends any[]] ? [...(F extends 0 ? [S, P] : [P]), ...SnakeRslt<K, 1>] : [];
	type OnedArgs<T extends any[]> = T extends (infer K)[] ? ProceArgs<K> : never;
	type LtdUedProce<T> = T extends [infer K, ...infer T1] ? [ProceArgs<K>, ...LtdUedProce<T1>] : []
	type UedProce<T extends any[]> = ArrayLtdSplited<T> extends [infer T0, (infer S)[], infer T2] ? [...LtdUedProce<T0>, ...(ProceArgs<S> extends never ? [] : ProceArgs<S>[]), ...LtdUedProce<T2>] : []
	type LtdUedProceE<T> = T extends [infer K, ...infer T1] ? ProceErrs<K> | LtdUedProceE<T1> : never
	type UedProceE<T extends any[]> = ArrayLtdSplited<T> extends [infer T0, (infer S)[], infer T2] ? LtdUedProceE<T0> | ProceErrs<S> | LtdUedProceE<T2> : []
	function getId(): number
	function doRtn<R, T extends ProceN, P extends any[] = ProceArgs<T>, E extends any[] = ProceErrs<T>>(_t: T, expr: CbNor<P, R>, param: P | P[0] | E | E[0]): R
	function act<R, T extends ProceN, R0 extends any[] = [], P extends any[] = ProceArgs<T>, E extends any[] = ProceErrs<T>>(_t: T, doexpr: CbNxt<P, R0, E, R> | CbCur<P, E, R>, args: R0): R
	function clear<T extends ProceN, P extends any[] = ProceArgs<T>>(_t: T, param: P | P[0]): void
	function exeordo<T extends ProceN, E extends any[] = ProceErrs<T>>(_t: T, param: E | E[0]): any
	function toss<T extends ProceN, E extends any[] = ProceErrs<T>>(_t: T, errObj: E[0]): void
	function tpus<RT, T extends ProceN, RO = RT, P extends any[] = ProceArgs<T>, E extends any[] = ProceErrs<T>>(_t: T, todo?: CbNor<P, RT, any[]>, ordo?: CbNor<E, RO, any[]>): void
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
		config: ConfigClassN
		pointer: number
		before?: ProceN
		uncaught: boolean
		getBefore(n?: ProceArray): ProceArray
		setBefore(n?: ProceArray | ProceN[]): Proce<P, E>
		then<RT, E1 extends any[] = [any]>(todo?: CbNor<P, RT, any[]>): Proce<[RT], E1 | E>
		then<RT, RO = RT, E1 extends any[] = [any]>(todo?: CbNor<P, RT, any[]>, ordo?: CbNor<E, RO, any[]>): Proce<[RT | RO], E1>
		trap<RO, E1 extends any[] = [any]>(ordo?: CbNor<E, RO, any[]>): Proce<P, E1> | Proce<[RO], E1>
		next<P1 extends any[], E1 extends any[]>(doexpr?: CbNxt<P1, P, E1>, ordo?: CbNor<E1, any, any[]>, config?: Config): Proce<P1, E1>
		take<D extends number = -1>(depth?: D): ProceTaked<P, E, D>
		take<RT, RO = RT, D extends number = -1, T1 = ProceTaked<P, E, D>>(todo: t.tf<T1, RT, 0>, ordo?: t.tf<T1, RO, 1>, depth?: D): Proce<[RT | RO]>
		conf<E1>(config?: Config, ordo?: CbNor<E, E1, any[]>): t.cp<P, E1>
		configAll(n?: Config): Proce<P, E>
		todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
		ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
		snake<T extends CbNxt[], H extends CbNxt | CbNxt[]>(h: H, ...n: T): t.sn<H extends any[] ? H : [H, ...T]>
		one<H extends any, T extends any[]>(h: H, ...n: T): Proce<OnedArgs<H extends any[] ? H : [H, ...T]>, UedProceE<H extends any[] ? H : [H, ...T]>>
		all<H extends any, T extends any[]>(h: H, ...n: T): Proce<Transposed<UedProce<H extends any[] ? H : [H, ...T]>>, UedProceE<H extends any[] ? H : [H, ...T]>>
	}
	function then<RT, E1 extends any[] = [any]>(todo?: CbNor<[], RT, any[]>, ordo?: CbNor<[]>): Proce<[RT], E1>
	function trap(ordo?: CbNor<[]>): Proce<[], []>
	function next<P1 extends any[], E1 extends any[]>(doexpr?: CbNxt<P1, [], E1>, ordo?: CbNor<E1, any, any[]>, config?: Config): Proce<P1, E1>
	function conf<E1>(config?: Config, ordo?: CbNor<[], E1, any[]>): t.cp<[], E1>
	function configAll(): Proce<[], []>
	function todo<A extends Accur<A>, P1 extends A[]>(...n: P1): Proce<P1, []>
	function ordo<A extends Accur<A>, E1 extends A[]>(...n: E1): Proce<[], E1>
	function snake<T extends CbNxt[], H extends CbNxt | CbNxt[]>(h: H, ...n: T): t.sn<H extends any[] ? H : [H, ...T]>
	function one<H extends any, T extends any[]>(h: H, ...n: T): Proce<OnedArgs<H extends any[] ? H : [H, ...T]>, UedProceE<H extends any[] ? H : [H, ...T]>>
	function all<H extends any, T extends any[]>(h: H, ...n: T): Proce<Transposed<UedProce<H extends any[] ? H : [H, ...T]>>, UedProceE<H extends any[] ? H : [H, ...T]>>
	namespace t {
		type tf<T1, R, W> = CbNor<T1 extends Proce<infer P, infer E> ? W extends 0 ? P : E : W extends 0 ? [] : [any], R, any[]>
		type cp<P extends any[], E1> = Proce<P extends [] ? [] : P extends [infer K, ...any[]] ? [K] : P, [E1]>
		// type sf<F, P extends any[], A extends any[]> = SnakeRslt<[CbNxt<F extends CbNxt<infer K> ? K : any[], P>, ...A]>
		// type sm<B extends any[], E1 extends any[], F, A extends any[]> = SnakeList<B, E1> | [F, ...A]
		// type st<B extends any[], E1 extends any[]> = Proce<B extends [...any[], infer K] ? K : any[], E1>
		type sn<T> = Proce<T extends CbNxt<infer P1>[] ? P1 : any[], T extends CbNxt<any[], any[], infer E1>[] ? E1 : [any]> extends Proce<infer P, infer E> ? Proce<P, E> : Proce
	}
	class ProceArray<P extends any[] = any[], E extends any[] = [any]> extends Array<Proce<P, E>> {
		constructor(...proce: Proce<P, E>[])
		then(todo?: CbNor<P, any[]>, ordo?: CbNor<E, any[]>): void
		trap(ordo?: CbNor<E, any[]>): void
		supp(ordo?: CbNor<E, any[]>): void
		index: { [id: number]: true }
		pointer: number
	}
	type Config = Omit<ConfigClass, 'get' | 'set'> | ConfigClass
	type ConfigClassN = ConfigClass<any[], any[]>
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
	type Nxtable = ProceN | typeof scpoProce
}
/**
 * 幻想私社异步过程类
 * @version 1.01220.20
 * @link https://github.com/E0SelmY4V/scpo-proce
 */
export function scpoProce<P extends any[], E extends any[] = [any]>(doexpr: scpoProce.CbCur<P, E>, config?: scpoProce.Config): scpoProce.Proce<P, E>
export function scpoProce<A extends Accur<A>, P extends A[]>(...arg: P): scpoProce.Proce<P, []>
export default scpoProce