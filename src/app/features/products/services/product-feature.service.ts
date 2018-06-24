import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~models';

import { ProductService } from '../../../global-services/product/product.service';

@Injectable()
export class ProductFeatureService {

	constructor(private productSrv: ProductService) { }

	selectProductList(pages$, filters$, sort$): Observable<Product[]> {
		return this.productSrv.selectMany(pages$, filters$, sort$);
	}

	selectOne(id: string): Observable<Product> {
		return this.productSrv.selectOne(id);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.productSrv.update(product);
	}

	deleteProduct(id: string): Observable<any> {
		return this.productSrv.deleteOne(id);
	}

	deleteProducts(ids: string[]): Observable<any> {
		return this.productSrv.deleteMany(ids);
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
