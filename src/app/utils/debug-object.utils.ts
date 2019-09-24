import { pipe } from 'rxjs';


if (!(window as any).__showsourcing__) {
	(window as any).__showsourcing__ = {};
}

/** object set on window for debugging purpose */
export const showsourcing = (window as any).__showsourcing__;


