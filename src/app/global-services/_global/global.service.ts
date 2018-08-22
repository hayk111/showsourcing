import { DocumentNode } from 'graphql';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, mergeMap, scan, switchMap } from 'rxjs/operators';
import { GlobalQuery } from '~global-services/_global/global.query.interface';
import { SelectParams, SelectParamsConfig } from '~global-services/_global/select-params';
import { User } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';
import { SelectListResult } from '~shared/apollo/interfaces/select-list-result.interface';

export interface GlobalServiceInterface<T extends { id?: string }> {
	selectOne: (id: string, ...args) => Observable<T>;
	selectMany: (paramsConfig: SelectParamsConfig, fields?: string, client?: string) => Observable<T[]>;
	selectAll: (fields: string, ...args) => Observable<T[]>;
	queryList: (paramsConfig: SelectParamsConfig) => SelectListResult<T>;
	update: (entity: T, ...args) => Observable<T>;
	updateMany: (entities: T[], ...args) => Observable<T[]>;
	create: (entity: T, ...args) => Observable<T>;
}


/**
 * Global service that other entity service can extend to do stuff via graphql,
 * This service deals with transforming what it receives then passing it to
 * apolloWrapper, it also deals with the cache
 */
export abstract class GlobalService<T extends { id?: string, lastUpdatedBy?: User, createdBy?: User }> implements GlobalServiceInterface<T> {


	constructor(
		protected wrapper: ApolloWrapper,
		protected queries: GlobalQuery,
		protected typeName?: string
	) {
	}


	/** selects all entity (subscription)
	 * @param id : id of the entity selected
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectOne(id: string, fields?: string, client?: string): Observable<T> {
		if (!this.queries.one) {
			throw Error('one query not implemented for this service');
		}
		const gql = this.queries.one(fields);

		return this.wrapper.use(client).selectOne(gql, id);
	}

	/** selects all entity (query)
	 * @param fields : string to specify the fields we want to query
	 * defaults to id, name
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	selectAll(fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.all) {
			throw Error('all query not implemented for this service');
		}
		return this.wrapper.use(client).selectAll(this.queries.all(fields));
	}

	/** selects slice of data that corresponds to parameters (query)
	 * @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	 *
	*/
	selectMany(paramsConfig?: SelectParamsConfig, fields?: string, client?: string): Observable<T[]> {
		if (!this.queries.many) {
			throw Error('many query not implemented for this service');
		}
		const gql = this.queries.many(fields);

		return this.wrapper.use(client).selectMany(gql, paramsConfig);
	}

	/** selects slice of data that corresponds to parameters. The Difference with selectMany is that
	 * this uses a query under the hood and not a subscription
 	* @param params$ : Observable<SelectParams> to specify what slice of data we are querying
	*/
	queryList(paramsConfig?: SelectParamsConfig, fields?: string, client?: string)
		: SelectListResult<T> {

		if (!this.queries.list) {
			throw Error('list query not implemented for this service');
		}

		const gql = this.queries.list(fields);
		return this.wrapper.queryList(gql, paramsConfig);

	}

	/** update an entity
	 * @param entity : entity with an id and the fields we want to update
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	update(entity: T, client?: string): Observable<any> {

		const gql = this.queries.update();

		if (!this.queries.update) {
			throw Error('update query not implemented for this service');
		}

		return this.wrapper.use(client).update(gql, entity, this.typeName);
	}

	/** update many entities
	 * @param entities : Array of entities to update, each entity needs an id to be found in the db
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	updateMany(entities: T[], client?: string): Observable<any> {
		return forkJoin(entities.map(entity => this.update(entity, client)));
	}

	/** create an entity
	 * @param entity : entity with an id and the fields we want to create
	 * @param fields: the fields you want to query, if none is specified the default ones are used
	 * @param client: name of the client you want to use, if none is specified the default one is used
	*/
	create(entity: T, client?: string): Observable<any> {
		if (!this.queries.create) {
			throw Error('create query not implemented for this service');
		}
		const gql = this.queries.create();
		return this.wrapper.use(client).create(gql, entity, this.typeName);
	}


	deleteOne(id: string, client?: string): Observable<any> {
		if (!this.queries.deleteOne) {
			throw Error('delete one query not implemented for this service');
		}
		const gql = this.queries.deleteOne();
		return this.wrapper.use(client).delete(gql, id);
	}

	deleteMany(ids: string[], client?: string): Observable<any> {
		if (!this.queries.deleteMany) {
			throw Error('delete many query not implemented for this service');
		}
		const gql = this.queries.deleteMany();
		return this.wrapper.use(client).deleteMany(gql, ids);
	}

}


