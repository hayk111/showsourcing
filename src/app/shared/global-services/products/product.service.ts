import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { ProductQueries } from './product.queries';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { Product } from '~models';

@Injectable()
export class ProductService implements GlobalServiceInterface<Product> {

	queries = new ProductQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Product> {
		throw Error('not implemented yet');
	}

	selectAll(fields: string) {
		return this.apollo.subscribe({
			query: this.queries.all(fields)
		}).pipe(map(({ data }) => (<any>data).product));
	}

	update(product: Product): Observable<Product> {
		return this.apollo.update({
			mutation: this.queries.update,
			input: product,
			typename: 'Product'
		}).pipe(map(({ data }) => (<any>data).product));
	}

	create(product: Product): Observable<Product> {
		return this.apollo.create({ mutation: this.queries.create, input: product, typename: 'Product' })
			.pipe(
				map((r: any) => r.data.addProduct.id)
			);
	}

	delete(product: Product) {
		return this.apollo.delete({ mutation: this.queries.delete, input: product.id, typename: 'Product' }).pipe(first());
	}

	deleteMany(product: Product[]) {
		return null;
	}

}

