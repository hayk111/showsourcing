import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { ProductService } from '../../../global-services/product/product.service';

@Injectable()
export class ProductFeatureService {

	constructor(private apollo: ApolloClient, private productSrv: ProductService) { }


	selectProductList(pages$, filters$, sort$): Observable<Product[]> {
		return this.productSrv.selectList(pages$, filters$, sort$);
	}

	selectOne(id: string): Observable<Product> {
		return this.productSrv.selectOne(id);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.productSrv.update(product);
	}

	deleteProduct(productId: string): Observable<any> {
		// return this.productSrv.delete();
		throw Error('not implemented yet');
	}

	deleteProducts(products: string[]): Observable<any> {
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
