import { Injectable } from '@angular/core';
import { tap, map, switchMap, mergeMap, shareReplay} from 'rxjs/operators';
import { ApiQueryOption, ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { FilterService, FilterType } from '~core/filters';
import { Entity } from '~core/erm3/models/_entity.model';
import { uuid } from '~utils';
import {
	MutationOptions,
	WatchQueryOptions,
} from 'apollo-client';
import { Typename } from '~core/erm3/typename.type';
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';
import { TeamService, UserService } from '~core/auth';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PropertyOptionsService {
	constructor(
		private apiSrv: ApiService,
		private filterSrv: FilterService,
	) {}

	listPropertyOptions (
		typename: string,
		teamId: string = TeamService.teamSelected.id,
		apiOptions: ApiQueryOption = {}
	): Observable<any[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = { byId: teamId, limit: 10000, type: {
			'eq': typename
		} };
		const queryBuilder = QueryPool.getQuery('PropertyOption', QueryType.LIST_BY); // the listBy get a method to build the query
		options.query = queryBuilder('Team');

		console.log('listBy -> options', options);

		return this.apiSrv.query<any[]>(options).data$;
	}

	createPropertyOption(
		entity: { type: String, value: String } & Entity,
		apiOptions: ApiQueryOption = {}
	): Observable<any> {
		const options = apiOptions as MutationOptions;
		options.mutation = QueryPool.getQuery('PropertyOption', QueryType.CREATE);
		entity.id = uuid();
		entity.teamId = TeamService.teamSelected.id;
		entity.createdAt = new Date().toISOString();
		entity.lastUpdatedAt = new Date().toISOString();
		entity.deleted = false;
		options.variables = { input: { ...entity } };
		return this.apiSrv.mutate(options);
	}
}
