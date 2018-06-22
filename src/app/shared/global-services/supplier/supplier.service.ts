import { Observable } from 'rxjs';
import { Supplier } from '~models';
import { Injectable } from '@angular/core';


@Injectable()
export class SupplierService {

	selectOne(id: string): Observable<Supplier> {
		throw Error('not implemented yet');
	}

	// selectList(): Observable<Supplier[]> {
	// 	throw Error('not implemented yet');
	// }

	// selectAll() {

	// }

	update(supplier: Supplier) {
		throw Error('not implemented yet');
	}

	create(supplier: Supplier) {
		throw Error('not implemented yet');
	}

	delete(supplier: Supplier) {
		throw Error('not implemented yet');
	}

}

