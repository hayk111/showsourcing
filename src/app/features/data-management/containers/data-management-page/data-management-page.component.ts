import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, tap, takeUntil, catchError, flatMap, max, concat, count, take } from 'rxjs/operators';
import { ERM, Category } from '~models';
import { SortEvent } from '~shared/table/components/sort-event.interface';
import { AutoUnsub } from '~utils';
import { CategoryService } from '~features/data-management/services/category.service';
import { SelectionService } from '~features/supplier/services/selection.service';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss'],
	providers: [SelectionService]
})
export class DataManagementPageComponent extends AutoUnsub implements OnInit {
	entities = [ERM.EVENT, ERM.CATEGORY, ERM.SUPPLIER, ERM.TAG, ERM.PROJECT];
	categories$: Observable<Category[]>;
	selected$: Observable<Map<string, boolean>>;
	/** whether some suppliers are currently being loaded */
	pending: boolean;
	/** when the suppliers are loaded for the first time */
	initialLoading = true;
	/** current sort used for sorting suppliers */
	sort$: Subject<SortEvent> = new Subject();
	currentSort: SortEvent = { sortBy: 'creationDate', sortOrder: 'ASC' };

	constructor(
		private categorySrv: CategoryService,
		private selectionSrv: SelectionService) {
		super();
	}

	ngOnInit() {
		this.pending = true;
		this.categories$ = this.categorySrv.selectCategories().pipe(
			tap(() => {
				if (this.initialLoading) {
					this.pending = false;
					this.initialLoading = false;
				}
			})
		);
		this.selected$ = this.selectionSrv.selection$;
	}

	/** When a supplier has been selected */
	selectItem(entityId: string) {
		this.selectionSrv.selectOne(entityId);
	}

	/** When a supplier has been unselected */
	unselectItem(entityId: string) {
		this.selectionSrv.unselectOne(entityId);
	}

	/** When all suppliers have been selected at once (from the table) */
	selectAll(ids: string[]) {
		this.selectionSrv.selectAll(ids);
	}

	/** reset the selection of suppliers */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	onSort(sort: SortEvent) {
		this.currentSort = sort;
		this.pending = true;
		this.categorySrv.sortCategories({ sort }).then(() => {
			this.pending = false;
		});
	}

}
