import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService, SelectionService } from '~core/list-page';
import { AutoUnsub } from '~utils';
import { FilterService } from '~shared/filters/services/filter.service';
import { ListHelperService, ListPageViewService } from '~core/list-page2';
import { Observable } from 'rxjs';
import { Supplier } from '~core/erm3/models';
import { TeamService, CompanyService } from '~core/auth';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'supplier-data-page-app',
	templateUrl: '../shared/list-management-template.html',
	styleUrls: [
		'./supplier-data-page.component.scss',
		'../shared/list-management-styles.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService, SelectionService, ListPageViewService],
	host: {
		class: 'table-page'
	}
})
export class SupplierDataPageComponent extends AutoUnsub implements OnInit {
	typename: Typename = 'Supplier';

	items$: Observable<Supplier[]>;

	constructor(
		public teamSrv: TeamService,
		public companySrv: CompanyService,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public filterSrv: FilterService,
		public listFuseHelper: ListHelperService
	) {
		super();
	}

	ngOnInit() {
	}

	mergeSelected() {
		const suppliers = this.selectionSrv.getSelectedValues();
		this.dialogCommonSrv.openMergeDialog({
			type: this.typename,
			entities: suppliers
		});
	}

	showItemsPerPage(count: number) {
	}
}
