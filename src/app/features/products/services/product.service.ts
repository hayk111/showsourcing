import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product, Project } from '~models';
import { ProductQueries } from '~features/products/services/product.queries';
import { take, map, filter } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class ProductService {

	constructor(private apollo: ApolloClient) { }

	getList(): Observable<Product[]> {
		throw Error('not implemented yet');
	}

	selectById(id: string): Observable<Product> {
		return this.apollo.subscribe({ query: ProductQueries.oneProduct, variables: { query: `id == "${id}"` } }).pipe(
			filter((r: any) => r.data.products),
			map((r: any) => r.data.products[0])
		);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.apollo.update({ mutation: ProductQueries.updateProduct, input: product, typename: 'Product' });
	}

	deleteProducts(ids: string[]) {
		throw Error('not implemented yet');
	}

	addFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	downloadFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	addImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	rotateImage(): Observable<any> {
		throw Error('not implemented yet');
	}
}
