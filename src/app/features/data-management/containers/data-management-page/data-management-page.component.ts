import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil, first } from 'rxjs/operators';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { Category, ERM } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'data-management-page-app',
	templateUrl: './data-management-page.component.html',
	styleUrls: ['./data-management-page.component.scss'],
	providers: [SelectionService]
})
export class DataManagementPageComponent extends AutoUnsub implements OnInit {
	title: string;
	items$: Observable<any[]>;
	selected$: Observable<Map<string, boolean>>;
	/** whether some suppliers are currently being loaded */
	pending: boolean;
	/** when the suppliers are loaded for the first time */
	initialLoading = true;
	/** current sort used for sorting suppliers */
	sort$: Subject<Sort> = new Subject();
	currentSort: Sort = { sortBy: 'creationDate', sortOrder: 'ASC' };

	constructor(
		private dataManagementSrv: DataManagementService,
		private selectionSrv: SelectionService,
		private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		// we retrieve the parameters from the router given at settings.component.html link
		this.route.params.pipe(
			takeUntil(this._destroy$)
		).subscribe(params => this.title = params.id);
		this.pending = true;
		this.items$ = this.dataManagementSrv.selectItems(this.title).pipe(
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

	onSort(sort: Sort) {
		this.currentSort = sort;
		this.pending = true;

	}

}
