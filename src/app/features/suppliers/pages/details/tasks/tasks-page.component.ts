import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Supplier } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListPageViewService, SelectionService, ListHelper2Service } from '~core/list-page2';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListHelper2Service,
		SelectionService,
		FilterService,
		ListPageViewService
	],
	host: { class: 'table-page' }
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	supplier: Supplier;
	filterTypes = [FilterType.DONE];

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public filterSrv: FilterService,
		public selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		this.supplier = { id: supplierId };
		this.filterSrv.setup([{ type: FilterType.SUPPLIER, value: supplierId }]);
		this.listHelper.setup('Task', this._destroy$);
	}
}
