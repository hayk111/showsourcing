import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// entities are loaded different ways.

// 1. api/country. The first way and most simple way is api followed
// by the name of the entity, ex: api/country.
// this is for static entities, mainly

// 2. api/team/:teamId/product. The second is by loading entities for a team

// 3. api/team/:teamId/product/comments. The third way is for loading entities
// related to another.

@Injectable()
export class EntityServiceService {
	private teamId: string;

	constructor(private http: HttpClient) { }

	load(params: LoadParams) {
	// 	let url = 'api'
	// 	if (params.isTeamEntity)
	// 		url += `/team/${this.teamId}`;
	// 	if ()

	// }
	}

}


export interface LoadParams {
	isTeamEntity?: boolean;
	teamId?: string;
	entityName?: string;
	urlParamsAsString?: string;
	drop?: number;
	isRecurring?: boolean;
}
