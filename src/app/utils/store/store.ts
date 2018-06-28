import { tap } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs';

if (window) {
	(window as any).store = {};
}

export const toStore = (key: string): MonoTypeOperatorFunction<any> =>
	tap(data => (window as any).store[key] = data);

export enum StoreKey {
	FILTER_PRODUCT = 'filters/product',
	FILTER_SUPPLIER = 'filters/suppliers',
	FILTER_PROJECT = 'filters/projects',
	FILTER_PROJECT_PRODUCTS = 'filters/project/products'
}
