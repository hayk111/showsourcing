import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product } from '~models';

@Injectable()
export class ProductService {

	constructor(private apollo: Apollo) { }

	getList(): Observable<Product[]> {
		throw Error('not implemented yet');
	}

	getById(id: string): Observable<Product> {
		throw Error('not implemented yet');
	}

	updateProduct(product: Product) {
		throw Error('not implemented yet');
	}

	deleteProducts(ids: string[]) {
		throw Error('not implemented yet');
	}

	addTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	addComment(): Observable<any> {
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