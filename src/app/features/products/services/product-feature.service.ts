import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { ProductService } from '~shared/global-services/product/product.service';

@Injectable()
export class ProductFeatureService {

	constructor(private apollo: ApolloClient, private productSrv: ProductService) { }


	selectProductList(pages$, filters$, sort$): Observable<Product[]> {
		return this.productSrv.selectList(pages$, filters$, sort$);
	}

	createQueryFromFilters(filtergroup) {
		return filtergroup ?
			filtergroup
				.filters
				.map(({ type, value }) => this.getFieldCondition(type, value)).join(' or ') : '';
	}

	private getFieldName(type) {
		if (type === 'tag') {
			return 'tags';
		}
		return type;
	}

	private getFieldCondition(type, value) {
		return (type !== 'favorite' && type !== 'archived') ?
			`${this.getFieldName(type)}.id == "${value}"` :
			`${this.getFieldName(type)} == ${value}`;
	}

	selectById(id: string): Observable<Product> {
		return this.productSrv.selectOne(id);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.productSrv.update(product);
	}

	deleteProduct(productId: string): Observable<Product> {
		// return this.productSrv.delete();
		throw Error('not implemented yet');
	}

	deleteProducts(products: string[]) {
		return forkJoin(products.map(productId => this.deleteProduct(productId)));
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
