import { Injectable, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter, FilterGroupName } from '../../../store/model/filter.model';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { selectFilterGroup, selectFiltersAsUrlParams } from '../../../store/selectors/filter.selectors';
import { UrlBuilder } from '../../../../utils/url-builder.class';
import Log from '../../../../utils/logger/log.class';
import { ActionType, ProductActions } from '../../../store/action/product.action';
import { switchMap } from 'rxjs/operators';
import { selectUser } from '../../../store/selectors/user.selector';

@Injectable()
export class TeamItemLoaderService {
	filterGroupName: FilterGroupName;
	private initiated = false;
	private actions: any;

	constructor(private store: Store<any>, private http: HttpClient) {
		Log.debug('TeamItemLoaderService');
	}

	init(targetEntity: string, actions: any, filterGroupName) {
		if (this.initiated)
			return;
		const urlBuilder = new UrlBuilder('team');
		this.filterGroupName = filterGroupName;
		this.initiated = true;
		this.actions = actions;

		urlBuilder.entity = targetEntity;
		// TODO refactor this more linearly
		this.store.select(selectUser)
		.pipe(
			map(u => u.currentTeamId),
			filter(tid => tid),
			distinctUntilChanged(),
			switchMap(tid => this.subToItem(tid, urlBuilder)),
		).subscribe((p: any) => this.store.dispatch(this.actions.setData(p.elements)));
	}

	subToItem(tid: string, urlBuilder) {
		urlBuilder.id = tid;
		return this.store.select(selectFiltersAsUrlParams(this.filterGroupName))
		.pipe(
			switchMap((params: string) => {
				this.store.dispatch(this.actions.setPending());
				const endpoint = urlBuilder.getUrlWithParams(params);
				return this.http.get(endpoint);
			})
		);
	}

}
