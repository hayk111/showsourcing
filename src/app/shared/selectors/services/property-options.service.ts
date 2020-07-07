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
	): Observable<any[]> {
		return api.PropertyOption.findByType(type).data$;
	}

	createPropertyOptions(
		propertyOptions: [{ type: string, value: any }]
	): Observable<any> {
		return api.PropertyOption.create(propertyOptions);
	}

	deletePropertyOption(
		entity: any,
		apiOptions = {}) {
		const options = apiOptions as MutationOptions;
		return api.PropertyOption.delete([entity]);
	}
}
