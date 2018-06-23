import { Observable } from 'rxjs';
import { SortEvent } from '~shared/table/components/sort-event.interface';

export interface GlobalServiceInterface<T> {
	selectOne: (id: string) => Observable<T>;
	selectMany?: (
		page$: Observable<number>,
		query$: Observable<string>,
		sort$: Observable<SortEvent>
	) => Observable<T[]>;
	selectAll: (fields: string) => Observable<T[]>;
	update: (entity: T) => Observable<T>;
	create: (entity: T) => Observable<T>;
	delete: (entity: T) => Observable<any>;
	deleteMany: (entity: T[]) => Observable<any>;
}

