import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadParams } from '~entity/utils';
import { UrlBuilder } from './url-builder.class';
import { UserService } from '~user/services';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { selectEntity, ERM, EntityRepresentation } from '~app/shared/entity';
import { Store } from '@ngrx/store';
import { FilterGroupName, selectFilterGroup } from '~app/shared/filters';
import { merge } from 'rxjs/observable/merge';
import { User } from '~app/features/user';

// entities are loaded different ways.

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

	load(params: LoadParams): Observable<any> {
		// we make sure the user is loaded before doing anything
		return this.userSrv.user$.pipe(
			switchMap((user: User) => {
				// we construct an url given the params
				let url = this.urlBuilder.getUrl(params, user);
				return this.makeGetRequest(url, params);
			})
		);
	}

	private makeGetRequest(url: string, params: LoadParams) {
		// then we make the request
		// if not recurring simple request
		if (!params.recurring) {
			return this.http.get(url);
		} else {
			return this.http.get(url);
		}
	}

	loadTeamItem(params: LoadParams) {
		return this.load(params);
	}
}
