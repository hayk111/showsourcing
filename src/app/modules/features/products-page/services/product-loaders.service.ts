import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter, FilterGroup, FilterGroupName } from '../../../store/model/filter.model';
import { HttpClient } from '@angular/common/http';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { selectFilterCategory, selectFilterGroup, selectFiltersAsUrlParams } from '../../../store/selectors/filter.selectors';
import { UrlBuilder } from '../../../../utils/url-builder.class';

@Injectable()
export class ProductLoadersService {
	urlBuilder = new UrlBuilder('team', 'product');
	products$ = new Subject<any>();

	constructor(private store: Store<any>, private http: HttpClient) {
		this.store.select('user')
		.pipe(
			map(u => u.currentTeamId),
			filter(tid => tid),
			distinctUntilChanged()
		).subscribe(tid => this.subToProducts(tid));
	}

	subToProducts(tid: string) {
		this.urlBuilder.id = tid;
		this.store.select(selectFiltersAsUrlParams(FilterGroupName.PRODUCT_PAGE))
		.subscribe((params: string) => {
			let endpoint = this.urlBuilder.getUrlWithParams(params);
			this.http.get(endpoint).subscribe((p: any) => {
				this.products$.next(p.elements);
			});
		});
	}

}
