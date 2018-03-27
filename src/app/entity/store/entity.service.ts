import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';
import { ApiParams, Patch } from '~entity/utils';

import { EntityRepresentation } from './entity.model';
import { UrlBuilder } from '../utils/url-builder.class';
import { Resolver } from '~app/app-root/utils/resolver.class';
import { UserService } from '~app/features/user/services/user.service';

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
	) { }

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

	post(params: ApiParams): Observable<any> {
		// we make sure the user is target before doing anything
		return this.userSrv.user$.pipe(
			switchMap((user: User) => {
				// we construct an url given the params
				const url = this.urlBuilder.getUrl(params, user);
				return this.http.post(url, params.body);
			})
		);
	}

	delete(params: ApiParams): Observable<any> {
		return this.http.delete(`api/${params.target.urlName}/${params.targetId}`);
	}

	patch(patch: Patch, repr: EntityRepresentation) {
		const value = Resolver.create(patch.propName, patch.value);
		return this.http.patch(`api/${repr.urlName}/${patch.id}`, value);
	}

	merge(params: ApiParams) {
		const url = this.urlBuilder.getUrl(params, this.userSrv.user);
		return this.http.post(`${url}/mergeWith`, params.body);
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
