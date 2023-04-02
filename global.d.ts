import imp from '.';

declare global {
	namespace globalThis {
		export import scpoProce = imp;
	}
}
