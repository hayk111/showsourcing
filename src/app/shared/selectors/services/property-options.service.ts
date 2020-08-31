import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { api, IApiResponse, PropertyOption } from 'showsourcing-api-lib';
import { FilterService } from '~core/filters';
import { SortService } from '~shared/table/services/sort.service';

@Injectable({ providedIn: 'root' })
export class PropertyOptionsService {
	private _data$ = new BehaviorSubject([]);
	data$ = this._data$.asObservable();

	// TODO We should have a type for default PropertyOption types 'TAG', 'CATEGORY', ...
	private type: string;
	private _lastSub: IApiResponse<PropertyOption> | undefined;

	constructor(private filterSrv: FilterService, private sortSrv: SortService) {}

	setup(type: string, componentDestroy$?: Observable<any>) {
		this.type = type;
		componentDestroy$?.subscribe(() => {
			this._lastSub.unsubscribe();
		});

		combineLatest(this.filterSrv.valueChanges$, this.sortSrv.sort$)
			.pipe(
				tap(_ => {
					if (this._lastSub) {
						this._lastSub.unsubscribe();
					}
				}),
				switchMap(([filter, sort]) => {
					this._lastSub = api.PropertyOption.findByType$(this.type, { filter, sort });
					return this._lastSub.data$;
				}),
				tap((data: any[]) => this._data$.next(data)),
				takeUntil(componentDestroy$)
			)
			.subscribe();
	}

	listPropertyOptions(type: string, options?: any): Observable<any[]> {
		return api.PropertyOption.findByType$(type, options).data$;
	}

	createPropertyOptions(propertyOptions: [{ type: string; value: any }]): Observable<any> {
		return api.PropertyOption.create(propertyOptions).local$;
	}

	deletePropertyOption(entity: any) {
		return api.PropertyOption.delete([entity]).local$;
	}
}
