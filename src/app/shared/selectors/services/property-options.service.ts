import { Injectable } from '@angular/core';
import { ApiQueryOption, ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Entity } from '~core/erm3/models/_entity.model';
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
		private teamSrv: TeamService,
	) {}

	listPropertyOptions (
		type: string,
		teamId: string = TeamService.teamSelected.id,
		apiOptions: ApiQueryOption = {}
	): Observable<any[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = { byId: teamId, limit: 10000, type: {
			'eq': type
		} };
		const queryBuilder = QueryPool.getQuery('PropertyOption', QueryType.LIST_BY); // the listBy get a method to build the query
		options.query = queryBuilder('Team');

		return this.apiSrv.query<any[]>(options).data$;
	}

	createPropertyOption(
		entity: { type: String, value: String } & Entity,
		apiOptions: ApiQueryOption = {}
	): Observable<any> {
		const options = apiOptions as MutationOptions;
		return this.apiSrv.create('PropertyOption', entity, options);
	}

	deletePropertyOption(
		entity: { type: String, value: String } & Entity,
		apiOptions: ApiQueryOption = {}) {
		const options = apiOptions as MutationOptions;
		return this.apiSrv.delete('PropertyOption', entity, options);
	}
}
