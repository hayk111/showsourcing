import { Injectable } from '@angular/core';
import { ProductService } from '~global-services';
import { map, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchFeatureService {

	constructor(private productSrv: ProductService) { }

	search(search: string) {
		return this.productSrv.queryMany({ query: `name CONTAINS[c] "${search}"` }).pipe(
			first(),
			map(m => m)
		);
	}
}
