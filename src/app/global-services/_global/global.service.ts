import { Observable, combineLatest } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';
import { SortEvent } from '~shared/table/components/sort-event.interface';

import { GlobalQuery } from './global.query.interface';
import { PER_PAGE } from '~utils';

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
	deleteOne: (id: string) => Observable<any>;
	deleteMany: (ids: string[]) => Observable<any>;
}


export abstract class GlobalService<T> implements GlobalServiceInterface<T> {

	constructor(
		protected apollo: ApolloClient,
		protected queries: GlobalQuery,
		protected typeName: string) { }

	selectOne(id: string): Observable<T> {
		return this.apollo.selectOne({
			gql: this.queries.one,
			id
		});
	}

	selectMany(page$?: any, query$?: any, sort$?: any, take: number = PER_PAGE) {
		return combineLatest(page$, query$, sort$).pipe(
			map(res => ({
				// assigning default values in case none have been specified
				page: res[0] || 0,
				query: res[1] || '',
				sort: res[2] || {}
			})),
			// we start with this
			startWith({ page: 0, sort: {}, query: '' }),
			switchMap((opt: any) => {
				return this.apollo.selectMany({
					gql: this.queries.list,
					skip: opt.page * take,
					take: take,
					sortBy: opt.sort.sortBy,
					descending: opt.sort.sortOrder === 'ASC',
					query: opt.query
				});
			}),
			map(({ data }) => data.products)
		);
	}

	selectAll(fields: string = 'id, name'): Observable<T[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) });
	}

	update(entity: T): Observable<any> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: this.typeName
		});
	}

	create(entity: T): Observable<any> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: this.typeName
		});
	}

	deleteOne(id: string): Observable<any> {
		return this.apollo.delete({
			gql: this.queries.deleteOne,
			id,
			typename: this.typeName
		});
	}

	deleteMany(ids: string[]): Observable<any> {
		return this.apollo.deleteMany({
			gql: this.queries.deleteOne,
			ids
		});
	}

}


