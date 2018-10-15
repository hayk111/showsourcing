import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SupplierService } from '~global-services/supplier/supplier.service';

@Injectable({ providedIn: 'root' })
export class SearchService {

	constructor(private supplierSrv: SupplierService) { }

	search(search: string) {
		return zip(
			this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` }).pipe(first()),
		).pipe(
			map(results => {
				const [suppliers] = results;
				const elements = [];
				elements.push(...suppliers.map(supplier => Object.assign({}, supplier)));
				return elements;
			})
		);
	}
}
