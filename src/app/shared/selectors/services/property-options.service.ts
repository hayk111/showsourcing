import { Injectable } from '@angular/core';
import {
	MutationOptions,
	WatchQueryOptions
} from 'apollo-client';
import { api } from 'showsourcing-api-lib';
import { Observable, of } from 'rxjs';
import { TeamService } from '~core/auth';
import { Entity } from '~core/erm3/models/_entity.model';
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';

@Injectable({providedIn: 'root'})
export class PropertyOptionsService {
	constructor(
		private teamSrv: TeamService,
	) {}

	listPropertyOptions (
		type: string,
		teamId: string = TeamService.teamSelected.id,
		apiOptions = {}
	): Observable<any[]> {
		const options = apiOptions as WatchQueryOptions;
		options.variables = { byId: teamId, limit: 10000, type: {
			'eq': type
		} };
		options.fetchPolicy = 'network-only';
		const queryBuilder = QueryPool.getQuery('PropertyOption', QueryType.LIST_BY); // the listBy get a method to build the query
		options.query = queryBuilder('Team');

		return of(null);
		// TODO: implement return
		// return this.apiSrv.query<any[]>(options).data$;
	}

	createPropertyOption(
		entity: any,
		apiOptions = {}
	): Observable<any> {
		// const options = apiOptions as MutationOptions;
		return api.PropertyOption.create([entity]);
	}

	deletePropertyOption(
		entity: any,
		apiOptions = {}) {
		const options = apiOptions as MutationOptions;
		return api.PropertyOption.delete([entity]);
	}
}
