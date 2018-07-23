import { Injectable } from '@angular/core';

import { Observable, zip, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { ProductService } from '~global-services/product/product.service';
import { SelectParams } from '~global-services/_global/select-params';

@Injectable({ providedIn: 'root' })
export class SearchService {

	constructor(private productSrv: ProductService,
		private supplierSrv: SupplierService) {

	}

	search(search: string) {
		return zip(
			this.productSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${search}"` }))
			).pipe(first()),
			this.supplierSrv.selectMany(
				of(new SelectParams({ query: `name CONTAINS "${search}"` }))
			).pipe(first()),
		).pipe(
			map(results => {
				const [ products, suppliers ] = results;
				const elements = [];
				elements.push(...products.map(product => Object.assign({}, product, { type: 'product' })));
				elements.push(...suppliers.map(supplier => Object.assign({}, supplier, { type: 'supplier' })));
				return elements;
			})
		);
	}
}
