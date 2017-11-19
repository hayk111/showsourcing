import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter, FilterGroup, FilterGroupName } from '../../../store/model/filter.model';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { selectFilterCategory, selectFilterGroup, selectFiltersAsUrlParams } from '../../../store/selectors/filter.selectors';
import { UrlBuilder } from '../../../../utils/url-builder.class';
import Log from '../../../../utils/logger/log.class';
import { ActionType, ProductActions } from '../../../store/action/product.action';

@Injectable()
export class TeamItemLoaderService {
	urlBuilder = new UrlBuilder('team');
	private initiated = false;
	private actions: any;

	constructor(private store: Store<any>, private http: HttpClient) {
		Log.debug('TeamItemLoaderService');
	}

	init(targetEntity: string, actions: any) {
		if (this.initiated)
			return;
		this.initiated = true;
		this.actions = actions;
		this.urlBuilder.entity = targetEntity;
		this.store.select('user')
		.pipe(
			map(u => u.currentTeamId),
			filter(tid => tid),
			distinctUntilChanged()
		).subscribe(tid => this.subToItem(tid));
	}

	subToItem(tid: string) {
		this.urlBuilder.id = tid;
		this.store.dispatch(this.actions.setPending());
		this.store.select(selectFiltersAsUrlParams(FilterGroupName.PRODUCT_PAGE))
		.subscribe((params: string) => {
			let endpoint = this.urlBuilder.getUrlWithParams(params);
			this.http.get(endpoint).subscribe((p: any) => {
				this.store.dispatch(this.actions.setData(p.elements));
			});
		});
	}

}