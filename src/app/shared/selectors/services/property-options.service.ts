import { Injectable } from '@angular/core';
import {
	MutationOptions,
	WatchQueryOptions
} from 'apollo-client';
import { api, Typename, IApiResponse, PropertyOption } from 'showsourcing-api-lib';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TeamService } from '~core/auth';
import { FilterService } from '~core/filters';
import { SortService } from '~shared/table/services/sort.service';

@Injectable({providedIn: 'root'})
export class PropertyOptionsService {
	private _data$ = new BehaviorSubject([]);
	data$ = this._data$.asObservable();

	private typename: Typename | 'TAG';
	private _lastSub: IApiResponse<PropertyOption> | undefined;

	constructor(
		private teamSrv: TeamService,
		private filterSrv: FilterService,
		private sortSrv: SortService,
	) {}

	setup(
		typename: Typename | 'TAG',
		componentDestroy$?: Observable<any>,
	) {
		this.typename = typename;
		componentDestroy$?.subscribe(() => {
			this._lastSub.unsubscribe();
		});

		combineLatest(
			this.filterSrv.valueChanges$,
			this.sortSrv.sort$
		).pipe(
			switchMap(([filter, sort]) => {
				this._lastSub = api.PropertyOption.findByType$(this.typename, { filter, sort });
				return this._lastSub.data$;
			}),
			tap((data: any[]) => this._data$.next(data))
		).subscribe();
	}

	listPropertyOptions (
		type: string,
		options?: any
	): Observable<any[]> {
		return api.PropertyOption.findByType$(type, options).data$;
	}

	createPropertyOptions(
		propertyOptions: [{ type: string, value: any }]
	): Observable<any> {
		return api.PropertyOption.create(propertyOptions).local$;
	}

	deletePropertyOption(
		entity: any,
		apiOptions = {}) {
		const options = apiOptions as MutationOptions;
		return api.PropertyOption.delete([entity]).local$;
	}
}
