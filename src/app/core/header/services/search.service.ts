import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProductService } from '~core/erm';
import { SupplierService } from '~core/erm';

@Injectable({ providedIn: 'root' })
export class SearchService {

	constructor(private productSrv: ProductService,
		private supplierSrv: SupplierService) {
	}

	search(search: string) {
		if (search === '') {
			return of([]);
		}

		return zip(
			this.productSrv.queryMany({ query: `name CONTAINS[c] "${search}" OR description CONTAINS[c] "${search}"`, take: 5 }).pipe(first()),
			this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}" OR description CONTAINS[c] "${search}"`, take: 5 }).pipe(first()),
		).pipe(
			map(results => {
				const [products, suppliers] = results;
				const elements = [];

				if (products && products.length) {
					elements.push(...products.map(product => Object.assign({}, product, { type: 'product' })));
				}

				if (suppliers && suppliers.length) {
					elements.push(...suppliers.map(supplier => Object.assign({}, supplier, { type: 'supplier' })));
				}
				return elements;
			})
		);
	}
}
