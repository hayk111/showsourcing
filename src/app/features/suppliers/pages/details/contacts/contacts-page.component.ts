import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Supplier } from '~core/erm';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { FilterType } from '~shared/filters';
import { ID } from '~utils';

@Component({
	selector: 'contacts-page-app',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' },
	providers: [
		ListHelper2Service,
		SelectionService,
		ListPageViewService
	]
})
export class ContactsPageComponent implements OnInit {

	supplierId: ID;
	filterTypeEnum = FilterType;

	constructor(
		protected route: ActivatedRoute,
		protected listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		public viewSrv: ListPageViewService<any>
	) {  }

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		// this.listHelper.setup('Contact', 'Supplier', supplierId);
	}

	openNewContactDlg(supplier: Supplier) {

	}

}
