import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '~app/features/user';
import { ApiParams } from '~entity/utils';
import { UserService } from '~user/services';

import { EntityRepresentation } from './../models/entities.model';
import { UrlBuilder } from './url-builder.class';

// entities are target different ways.

// 1. api/country. The first way and most simple way is api followed
// by the name of the entity, ex: api/country.
// this is for static entities, mainly

// 2. api/team/:teamId/product. The second is by loading entities for a team

// 3. api/team/:teamId/product/comments. The third way is for loading entities
// related to another.

@Injectable()
export class EntityService {
	private teamId: string;

	constructor(
		private http: HttpClient,
		private userSrv: UserService,
		private store: Store<any>,
		private urlBuilder: UrlBuilder
	) {}

	load(params: ApiParams): Observable<any> {
		// we make sure the user is target before doing anything
		return this.userSrv.user$.pipe(
			switchMap((user: User) => {
				// we construct an url given the params
				const url = this.urlBuilder.getUrl(params, user);
				return this.makeGetRequest(url, params);
			})
		);
	}

	post(params: ApiParams, body: any): Observable<any> {
		// we make sure the user is target before doing anything
		return this.userSrv.user$.pipe(
			switchMap((user: User) => {
				// we construct an url given the params
				const url = this.urlBuilder.getUrl(params, user);
				return this.http.post(url, body);
			})
		);
	}

	delete(id: String, entityRep: EntityRepresentation): Observable<any> {
		return this.http.delete(`api/${entityRep.urlName}/${id}`);
	}

	private makeGetRequest(url: string, params: ApiParams) {
		// then we make the request
		// if not recurring simple request
		if (!params.recurring) {
			return this.http.get(url);
		} else {
			return this.http.get(url);
		}
	}

	loadTeamItem(params: ApiParams) {
		return this.load(params);
	}
}
