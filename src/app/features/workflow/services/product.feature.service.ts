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
				const statuses: any = {};
				products.forEach(product => {
					/* const status = product.status;
					if (status) {
						if (!statuses[status.id]) {
							statuses[status.id] = {
								status,
								products: [ product ]
							};
						} else {
							statuses[status.id].products.push(product);
						}
					} */
				});

				statuses['s1'] = {
					name: 'Send FQ',
					products: [
						{ name: 'prod1', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
						{ name: 'prod1a', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
						{ name: 'prod1b', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] }
					]
				};

				statuses['s2'] = {
					name: 'Validate Sample',
					products: [
						{ name: 'prod2', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] },
						{ name: 'prod2b', images: [{id: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953", fileName: "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg", orientation: 0}] }
					]
				};

				return Object.keys(statuses).map(key => statuses[key]);
			})
		);
	}
}
