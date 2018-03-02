import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadParams, UrlBuilder } from '~entity/utils';
import { UserService } from '~user';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

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

	constructor(private http: HttpClient, private userSrv: UserService) {}

	load(params: LoadParams): Observable<any> {
		// we make sure the user is loaded before doing anything
		return this.userSrv.user$.pipe(
			take(1),
			switchMap(user => {
				// we construct an url given the params
				const urlBuilder = new UrlBuilder(user);
				const url = urlBuilder.getUrl(params);
				// then we make the request
				// if not recurring simple request
				if (!params.recurring) {
					return this.http.get(url);
				} else {
					return this.http.get(url);
				}
			})
		);
	}

	loadTeamItem(params: LoadParams) {
		return this.load(params);
	}
}
