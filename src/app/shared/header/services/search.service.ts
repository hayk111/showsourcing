import { Injectable } from '@angular/core';
import { of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { ProductService } from '~global-services/product/product.service';
import { SupplierService } from '~global-services/supplier/supplier.service';

@Injectable({ providedIn: 'root' })
export class SearchService {

	constructor(private productSrv: ProductService,
		private supplierSrv: SupplierService) {
	}

	search(search: string) {
		return zip(
			this.productSrv.queryMany({ query: `name CONTAINS[c] "${search}"` }).pipe(first()),
			this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` }).pipe(first()),
		).pipe(
			map(results => {
				const [products, suppliers] = results;
				const elements = [];
				elements.push(...products.map(product => Object.assign({}, product, { type: 'product' })));
				elements.push(...suppliers.map(supplier => Object.assign({}, supplier, { type: 'supplier' })));
				return elements;
			})
		);
	}
}
