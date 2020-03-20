import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ContactService } from '~core/erm';
import { ListPageService } from '~core/list-page';
import { Contact, ERM, Supplier } from '~core/erm';
import { FilterType } from '~shared/filters';
import { AutoUnsub, ID } from '~utils';
import { ListFuseHelperService, SelectionService } from '~core/list-page2';

@Component({
	selector: 'contacts-page-app',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' },
	providers: [
		ListFuseHelperService,
		SelectionService
	]
})
export class ContactsPageComponent implements OnInit {

	supplierId: ID;
	filterTypeEnum = FilterType;

	constructor(
		protected route: ActivatedRoute,
		protected listHelper: ListFuseHelperService,
		public dialogCommonSrv: DialogCommonService,
	) {  }

	ngOnInit() {
		const supplierId = this.route.parent.snapshot.params.id;
		this.listHelper.setup('Contact', 'Supplier', supplierId);
	}

	openNewContactDlg(supplier: Supplier) {

	}

}
