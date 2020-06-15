import { Injectable } from '@angular/core';
import Fuse from 'fuse.js/dist/fuse.esm.js';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { debounce, filter, map, switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { TeamService } from '~core/auth';
import { ApiLibService } from '~core/api-lib';
import { Typename } from '~core/erm3/typename.type';
import { FilterService, FilterType } from '~core/filters';
import { DialogService } from '~shared/dialog';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from './selection.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { ExcludedService } from './excluded.service';

/** this service is about managing the tables of non searchable entities like category, tag, ...
 * It must be setup before use (see setup method)
 *
 * As some entities are not searchable / sortable, we query all entities (from the cache first)
 * and manage them as an array (search with fuse, sorting, paginating, ...)
 */
@Injectable({ providedIn: 'root' })
export class ListFuseHelperService<G = any> {
	private queryRef: any;
	private typename: Typename;
	private _fuse$ = new Subject();
	private _pending$ = new BehaviorSubject(true);
	pending$ = this._pending$.asObservable();

	private _total$ = new Subject<number>();
	private _total: number;
	total$ = this._total$.asObservable();

	fuseOptions = {
		keys: [],
		shouldSort: true,
		includeScore: true,
		threshold: 0, // 0 = full match
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
	};

	constructor(
		private selectionSrv: SelectionService,
		private apiLibSrv: ApiLibService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService,
		private paginationSrv: PaginationService,
		private excludedSrv: ExcludedService,
		private sortSrv: SortService
	) {
		// When the total change, we setup pagination
		this.total$.pipe().subscribe((total) => {
			this._total = total;
			this.paginationSrv.setupTotal(total);
		});
	}

	/** the filterSrv should be setup before the listFuseHelper to specify searchable columns.
	 * example of use:
	 * this.filterSrv.setup([], ['name']); => fuse will be searchable on name and not on createdBy, ...
	 * this.listHelper.setup('Category');
	 */
	setup(
		typename: Typename,
		byProperty: string = 'Team',
		byId: string = TeamService.teamSelected.teamId,
		queryOptions: any = {}
	) {
		byId = byId || TeamService.teamSelected.id;
		this.typename = typename;
		queryOptions.fetchPolicy = queryOptions.fetchPolicy || 'network-only';
		queryOptions.variables = { filter: this.filterSrv.queryArg };
		// this.queryRef = this.apiLibSrv.db.find(typename, byProperty, byId, queryOptions); // TODO: setup query ref
		this.fuseOptions.keys = this.filterSrv.searchedFields || this.fuseOptions.keys;
		// when we update the query, datas it will reasign fuse
		this.queryRef.data$.subscribe((datas) => {
			this._fuse$.next(new Fuse(datas, this.fuseOptions));
			this._pending$.next(false);
		});
	}

	/** items searched, without sort and without pagination */
	private _fusedItems$: Observable<G[]> = combineLatest(
		this._fuse$,
		this.filterSrv.valueChanges$,
		this.excludedSrv.valueChanges$
	).pipe(
		debounce(() => timer(400)),
		switchMap(([fuse, filters]: any) => {
			// the value changed should concern the FilterType search
			const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
			if (searchValue) return of(fuse.search(searchValue.value).map((data) => data.item));
			else return this.queryRef.data$;
		}),
		map((items: any) => {
			return items.filter(item => !this.excludedSrv.excludedIds.includes((item as any).id));
		}),
		tap((searchedDatas) => {
			this._total$.next(searchedDatas.length);
		})
	);

	/** items sorted, without pagination */
	searchedItems$ = combineLatest(this._fusedItems$, this.sortSrv.sort$).pipe(
		map(([searchedItems, sort]) => {
			if (!sort) return searchedItems;
			return searchedItems.sort((item1, item2) => {
				const direction = sort.direction === 'ASC' ? 1 : -1;
				return item1[sort.property] > item2[sort.property] ? direction : direction * -1;
			});
		})
	);

	paginedItems$: Observable<G[]> = combineLatest(
		this.paginationSrv.page$,
		this.paginationSrv.limit$,
		this.searchedItems$
	).pipe(
		map(([page, limit, sortedItems]) => {
			const indexStart = page * limit;
			return sortedItems.slice(indexStart, indexStart + limit);
		}),
		filter((paginedItems) => this._total === 0 || paginedItems.length > 0)
	);

	refetch() {
		this._pending$.next(true);
		return this.queryRef
			.refetch({ fetchPolicy: 'cache-first' })
			.then((_) => this._pending$.next(false));
	}

	create(addedProperties: any = {}) {
		this.dlgSrv
			.open(DefaultCreationDialogComponent, {
				typename: this.typename,
				extra: addedProperties,
			})
			.data$.pipe(
				switchMap((entity) => this.apiLibSrv.db.create(this.typename, [entity])),
				// tap((entity) => this.apiSrv.addToList(this.queryRef, entity))
			)
			.subscribe();
	}

	update(entity: any, typename?: Typename) {
		this.apiLibSrv.db.update(typename || this.typename, entity).subscribe();
	}

	updateProperties(entityId: string, propertyName: string, properties: any | string) {
		let propertiesToUpdate;

		if (typeof properties === 'object') {
			propertiesToUpdate = {
				...properties
			};

			if ('additionalFields' in properties) {
				propertiesToUpdate = {
					...properties.additionalFields,
					...properties,
				};

				delete propertiesToUpdate.additionalFields;
			}
		} else {
			propertiesToUpdate = properties;
		}

		this.apiLibSrv.db.update(this.typename, [{ id: entityId,
			properties: [{
				name: propertyName,
				value: JSON.stringify(propertiesToUpdate)
			}]
		} as any]).subscribe();
	}

	getProperty(propertyName, properties) {
		const index = properties.findIndex(property => property.name === propertyName);

		if (index !== -1) {
			const property = JSON.parse(properties[index].value);
			return property || null;
		}
	}

	delete(entity: any) {
		this.apiLibSrv.db.delete(this.typename, entity).subscribe((_) => {
			// this.apiSrv.deleteManyFromList(this.queryRef, [entity.id]);
		});
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		this.apiLibSrv.db.update(this.typename, selected.map(ent => ({ id: ent.id, ...entity})))
			.pipe(
				switchMap(_ => this.refetch())
			).subscribe();
	}

	deleteSelected() {
		const selecteds = this.selectionSrv.getSelectedValues();
		this.dlgSrv
			.open(ConfirmDialogComponent)
			.data$.pipe(switchMap((_) => this.apiLibSrv.db.delete(this.typename, selecteds)))
			.subscribe((_) => {
				// this.apiSrv.deleteManyFromList(
				// 	this.queryRef,
				// 	selecteds.map((el) => el.id)
				// );
				this.selectionSrv.unselectAll();
			});
	}

	loadMore() {
		throw Error('not implemented yet');
	}
}
