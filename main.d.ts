import { SntXcrNum } from 'accurtype'
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
	class Proce<P extends any[] = any[], E extends any[] = [any]> {
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