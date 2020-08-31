import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Supplier } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
		FilterService,
		ListPageViewService,
		ListHelper2Service
	],
	host: { class: 'table-page' }
})
export class SamplesPageComponent extends AutoUnsub implements OnInit {
	filterTypes = [FilterType.PRODUCT, FilterType.STATUS];
	supplier: Supplier;

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public filterSrv: FilterService
	) {
		super()
	}

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		this.supplier = { id: supplierId };
		this.filterSrv.setup([{ type: FilterType.SUPPLIER, value: supplierId }]);
		this.listHelper.setup('Sample', this._destroy$);
	}
}
