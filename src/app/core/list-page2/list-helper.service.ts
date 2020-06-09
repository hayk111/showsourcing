import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin, of, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap, mergeMap, concatMap } from 'rxjs/operators';
import { ApiLibService } from '~core/api-lib';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from './selection.service';
import { TeamService } from '~core/auth';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { Entity } from '~core/erm3/models/_entity.model';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';
import { RatingService } from '~shared/rating/services/rating.service';
import { ExcludedService } from './excluded.service';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: any;
	private typename: Typename;
	private _pending$ = new BehaviorSubject<boolean>(true);
	pending$ = this._pending$.asObservable();

	private _total$ = new BehaviorSubject(0);
	total$ = this._total$.asObservable();
	total = 0;
	/** the filtered items */
	filteredItems$ = combineLatest(
		this.filterSrv.valueChanges$,
		this.paginationSrv.page$,
		this.paginationSrv.limit$,
		this.sortSrv.sort$,
		this.excludedSrv.valueChanges$
	).pipe(
		// gets the query
		// map(([{ queryArg }, page, limit, sort]) => {
		// 	return this.apiLibSrv.db.find$(
		// 		this.typename,
		// 		{
		// 			filter: queryArg,
		// 			take: limit,
		// 			skip: page * limit,
		// 			sort,
		// 		},
		// 		{}
		// 	);
		// }),
		// // save it
		// tap(query => (this.queryRef = query)),
		// mergeMap(query => query.total$),
		// tap(total => this._total$.next(total)),
		// // add total to the paginationSrv
		// tap(total => this.paginationSrv.setupTotal(total)),
		// switchMap(_ => this.queryRef.data$),
		// // setting pending to false because we received data
		// tap(_ => this._pending$.next(false)),
		// map(items => items.filter(item => !this.excludedSrv.excludedIds.includes((item as any).id))),
		// map(items => this.ratingSrv.applyRatings(items, this.ratingSrv.ratings)),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private sortSrv: SortService,
		private paginationSrv: PaginationService,
		private excludedSrv: ExcludedService,
		private ratingSrv: RatingService,
		private apiLibSrv: ApiLibService,
		private filterSrv: FilterService,
		// private dlgCommonSrv: DialogCommonService, // ! Circular dependency
		private dlgSrv: DialogService
	) {
		this.total$.subscribe(total => (this.total = total));
	}

	setup(typename: Typename) {
		this.typename = typename;
		this.filterSrv.setup();
	}

	refetch(options?: WatchQueryOptions) {
		this._pending$.next(true);
		return this.queryRef
			.refetch({ ...options, fetchPolicy: 'network-only' })
			.then(_ => this._pending$.next(false));
	}

	/** Open a dialog to get entity properties depending on the typename. Then, create the new entity */
	create(linkedEntities?: Record<string, Entity<any>>) {
		// TODO change this default dialog with openCreationDlg
		this.dlgSrv
			.open(DefaultCreationDialogComponent, linkedEntities)
			.data$ // this.dlgCommonSrv.openCreationDlg(this.typename, linkedEntities).data$
			.pipe(switchMap(entity => this.apiLibSrv.db.create(this.typename, [entity])))
			.subscribe(/* created => this.apiSrv.addToList(this.queryRef, created) */);
	}

	update(entity: any, options?: any, typename?: Typename) {
		this.apiLibSrv.db.update(typename || this.typename, entity).subscribe();
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		const deleteMany$ = this.apiLibSrv.db.update(
			this.typename,
			selected.map(ent => ({ id: ent.id, ...entity }))
		);
		// .pipe(switchMap(_ => this.refetch()))
		deleteMany$.subscribe();
		return deleteMany$;
	}

	updateProperties(entityId: string, propertyName: string, properties: any) {
		const keys = Object.keys(properties);
		// keys.forEach(key => properties[key] = JSON.stringify(properties[key]));

		this.apiLibSrv.db.update(this.typename, [{ id: entityId,
			properties: [{
				name: propertyName,
				value: JSON.stringify(properties)
			}]
		} as any]).subscribe();
	}

	delete(entity: any) {
		this.apiLibSrv
			.db
			.delete(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	deleteSelected() {
		const selecteds = this.selectionSrv.getSelectedValues();
		this.dlgSrv
			.open(ConfirmDialogComponent)
			.data$.pipe(switchMap(_ => this.apiLibSrv.db.delete(this.typename, selecteds)))
			.subscribe(_ => {
				// this.apiSrv.deleteManyFromList(
				// 	this.queryRef,
				// 	selecteds.map(el => el.id)
				// );
				this.selectionSrv.unselectAll();
			});
	}

	loadMore() {
		throw Error('not implemented yet');
	}
}
