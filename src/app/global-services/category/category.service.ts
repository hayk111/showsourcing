import { ApolloClient } from '~shared/apollo';
import { Injectable } from '@angular/core';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { Category } from '~models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CategoryService implements GlobalServiceInterface<Category> {
	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Category> {
		throw Error('not implemented yet')
	}

	selectAll(): Observable<Category[]> {
		throw Error('not implemented yet')
	}

	update(category: Category): Observable<Category> {
		throw Error('not implemented yet')
	}
	create(entity: Category): Observable<Category> {
		throw Error('not implemented yet')
	}
	delete(entity: Category): Observable<any> {
		throw Error('not implemented yet')
	}
	deleteMany(entity: Category[]): Observable<any> {
		throw Error('not implemented yet')
	}
}