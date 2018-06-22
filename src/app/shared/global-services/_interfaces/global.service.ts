import { Observable } from 'rxjs';

export interface GlobalServiceInterface<T> {
	selectOne(id: string): Observable<T>;
	// TODO: thierry
	// selectList() {}
	selectAll(fields: string): Observable<T[]>;
	update(entity: T): Observable<T>;
	create(entity: T): Observable<T>;
	delete(entity: T): Observable<any>;
	deleteMany(entity: T[]): Observable<any>;
}

