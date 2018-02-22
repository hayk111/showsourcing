import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UrlBuilder } from '../../../utils/url-builder.class';
import { Log } from '@utils/index';
import { EntityRepresentation } from '../utils/entities.utils';
import { FilterGroupName } from '../model/misc/filter.model';
import { selectUser } from '../selectors/entities/user.selector';
import { selectFiltersAsUrlParams } from '../selectors/misc/filter.selectors';

@Injectable()
export class TeamItemLoaderService {

	constructor(private store: Store<any>, private http: HttpClient) {
		Log.debug('TeamItemLoaderService');
	}

	load(targetEntity: EntityRepresentation, filterGroupName?: FilterGroupName): Observable<any> {

		const urlBuilder = new UrlBuilder('team');
		urlBuilder.entity = targetEntity.urlName;

		// first we select the user
		return this.store.select(selectUser)
		.pipe(
			// then we get team id
			map(u => u.currentTeamId),
			filter(tid => tid),
			distinctUntilChanged(),
			// we get the items we want with the fitlers
			switchMap(tid => this.getFilteredItems(tid, urlBuilder, filterGroupName)),
		);
	}

	getFilteredItems(tid: string, urlBuilder: UrlBuilder, filterGroupName: FilterGroupName) {
		urlBuilder.id = tid;
		// we select the fitlers for a specific group
		return this.store.select(selectFiltersAsUrlParams(filterGroupName))
		// when we have the filters we get the items with said filters
		.pipe(
			switchMap((params: string) => {
				const endpoint = urlBuilder.getUrlWithParams(params);
				return this.http.get(endpoint);
			})
		);
	}

}
