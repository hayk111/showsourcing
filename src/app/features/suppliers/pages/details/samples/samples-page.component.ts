import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Supplier } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelperService,
		SelectionService,
		FilterService,
		ListPageViewService
	],
	host: { class: 'table-page' }
})
export class SamplesPageComponent implements OnInit {
	filterTypes = [FilterType.PRODUCT, FilterType.STATUS];
	supplier: Supplier;

	constructor(
		private route: ActivatedRoute,
		public listHelper: ListHelperService,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public filterSrv: FilterService
	) { }

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		this.supplier = { id: supplierId };
		this.filterSrv.setup([{ type: FilterType.SUPPLIER, value: supplierId }]);
		this.listHelper.setup('Supplier');
	}
}
