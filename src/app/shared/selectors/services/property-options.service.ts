import { Injectable } from '@angular/core';
import {
	MutationOptions,
	WatchQueryOptions
} from 'apollo-client';
import { api, Typename } from 'showsourcing-api-lib';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TeamService } from '~core/auth';
import { Entity } from '~core/erm3/models/_entity.model';
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';
import { FilterService } from '~core/filters';
import { SortService } from '~shared/table/services/sort.service';

@Injectable({providedIn: 'root'})
export class PropertyOptionsService {
	private _data$ = new BehaviorSubject([]);
	data$ = this._data$.asObservable();

	private typename: Typename | 'TAG';

	constructor(
		private teamSrv: TeamService,
		private filterSrv: FilterService,
		private sortSrv: SortService,
	) {}

	setup(typename: Typename | 'TAG') {
		this.typename = typename;

		combineLatest(
			this.filterSrv.valueChanges$,
			this.sortSrv.sort$
		).pipe(
			switchMap(([filter, sort]) => {
				return api.PropertyOption.findByType(this.typename, { filter, sort }).data$;
			}),
			tap((data: any[]) => this._data$.next(data))
		).subscribe();
	}

	listPropertyOptions (
		type: string,
		options?: any
	): Observable<any[]> {
		return api.PropertyOption.findByType(type, options).data$;
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
