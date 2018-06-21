import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, first } from 'rxjs/operators';
import { CategoryService } from '~features/data-management/services/category.service';
import { SelectionService } from '~features/supplier/services/selection.service';
import { Category, ERM } from '~models';
import { SortEvent } from '~shared/table/components/sort-event.interface';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss'],
	providers: [SelectionService]
})
export class DataManagementPageComponent extends AutoUnsub implements OnInit {
	entities = [ERM.EVENT, ERM.CATEGORY, ERM.SUPPLIER, ERM.TAG, ERM.PROJECT];
	categories$: Observable<Category[]>;
	items$: Observable<any[]>;
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
		private selectionSrv: SelectionService,
		private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(
			takeUntil(this._destroy$)
		).subscribe(params => params);
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
		console.log('onPageTs', entityId);
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

	}

}
