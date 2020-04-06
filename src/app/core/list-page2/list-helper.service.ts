import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from './selection.service';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { Entity } from '~core/erm3/models/_entity.model';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { DialogService } from '~shared/dialog';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private _pending$ = new BehaviorSubject<boolean>(true);
	pending$ = this._pending$.asObservable();
	private _total$ = new BehaviorSubject(0);
	total$ = this._total$.asObservable();
	/** the filtered items */
	filteredItems$ = combineLatest(
		this.filterSrv.valueChanges$,
		this.paginationSrv.page$,
		this.paginationSrv.limit$,
		this.sortSrv.sort$
	).pipe(
		// gets the query
		map(([{ queryArg }, page, limit, sort]) => this.apiSrv.search<G>(
			this.typename, {
				filter: queryArg,
				limit,
				from: page * limit,
				sort
			})
		),
		// save it
		tap(query => this.queryRef = query),
		mergeMap(query => query.total$),
		tap(total => this._total$.next(total)),
		// add total to the paginationSrv
		tap(total => this.paginationSrv.setupTotal(total)),
		// add the next token for infiniscroll
		// TODO
		// return the result
		switchMap(_ => this.queryRef.data$),
		// setting pending to false because we received data
		tap(_ => this._pending$.next(false)),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private sortSrv: SortService,
		private paginationSrv: PaginationService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		// private dlgCommonSrv: DialogCommonService, // ! Circular dependency
		private dlgSrv: DialogService
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	refetch(options?: WatchQueryOptions) {
		this._pending$.next(true);
		return this.queryRef.refetch({ ...options, fetchPolicy: 'network-only' })
		.then(_ => this._pending$.next(false));
	}

	/** Open a dialog to get entity properties depending on the typename. Then, create the new entity */
	create(linkedEntities?: Record<string, Entity<any>>) {
		// TODO change this default dialog with openCreationDlg
		this.dlgSrv.open(DefaultCreationDialogComponent, linkedEntities).data$
		// this.dlgCommonSrv.openCreationDlg(this.typename, linkedEntities).data$
		.pipe(
			switchMap(entity => this.apiSrv.create(this.typename, entity)),
		).subscribe(created => this.apiSrv.addToList(this.queryRef, created));
	}

	update(entity: any) {
		this.apiSrv.update(this.typename, entity);
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(ent => this.apiSrv.update(this.typename, { id: ent.id, ...entity}));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	delete(entity: any) {
		this.apiSrv.delete(this.typename, entity).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	deleteSelected() {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	loadMore() {
		throw Error('not implemented yet');
	}

}
