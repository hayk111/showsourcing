import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin, of, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap, mergeMap, concatMap } from 'rxjs/operators';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
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
import { QueryPool } from '~core/erm3/queries/query-pool.class';
import { QueryType } from '~core/erm3/queries/query-type.enum';
import { RatingService } from '~shared/rating/services/rating.service';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: ObservableQuery<G[]>;
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
		this.ratingSrv.valueChanges$
	).pipe(
		// gets the query
		map(([{ queryArg }, page, limit, sort, votes]) => {
			return this.apiSrv.searchBy<G>(
				this.typename, {
					filter: queryArg,
					take: limit,
					skip: page * limit,
					sort
				}, {});
			}
		),
		// save it
		tap(query => this.queryRef = query),
		mergeMap(query => query.total$),
		tap(total => this._total$.next(total)),
		// add total to the paginationSrv
		tap(total => this.paginationSrv.setupTotal(total)),
		switchMap(_ => {
			const options = {} as WatchQueryOptions;
			options.variables = { limit: 10000, filter: { deleted: {eq: false}} };
			options.fetchPolicy = 'network-only';
			options.query = QueryPool.getQuery('Vote', QueryType.LIST_BY)('Team');
			return this.apiSrv.query<G[]>(options).data$;
		}),
		tap(items => this.ratingSrv.setup(items)),
		// add the next token for infiniscroll
		// TODO
		// return the result
		switchMap(_ => this.queryRef.data$),
		// setting pending to false because we received data
		tap(_ => this._pending$.next(false)),
		map(items => this.ratingSrv.applyRatings(items, this.ratingSrv.ratings)),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private sortSrv: SortService,
		private paginationSrv: PaginationService,
		private ratingSrv: RatingService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		// private dlgCommonSrv: DialogCommonService, // ! Circular dependency
		private dlgSrv: DialogService
	) {
		this.total$.subscribe(total => this.total = total);
	}

	setup(typename: Typename) {
		this.typename = typename;
		this.filterSrv.setup();
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

	update(entity: any, options?: any) {
		this.apiSrv.update(this.typename, entity, options);
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
