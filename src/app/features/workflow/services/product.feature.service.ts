import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product, Project } from '~models';

import { ProductService, ProjectService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}

	getProductsStatuses() {
		return this.selectAll().pipe(
			tap(products => console.log('products = ', products)),
			map(products => {
				const statuses = {};
				products.forEach(product => {
					const status = product.status;
					if (status) {
						if (!statuses[status.id]) {
							statuses[status.id] = {
								status,
								products: [ product ]
							};
						} else {
							statuses[status.id].products.push(product);
						}
					}
				});
				return Object.keys(statuses).map(key => statuses[key]);
			})
		);
	}
}
