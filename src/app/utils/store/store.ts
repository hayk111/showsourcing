import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';
import { Resolver } from '~utils/resolver.class';

if (window) {
	(window as any).store = {};
}

export const toStore = (key: string): MonoTypeOperatorFunction<any> =>
	tap(data => (window as any).store[key] = data);

export enum StoreKey {
	FILTER_PRODUCT = 'filters/product',
	FILTER_SUPPLIER = 'filters/suppliers',
	FILTER_PROJECT = 'filters/projects'
}
