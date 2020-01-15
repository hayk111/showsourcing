import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ContactService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Contact, ERM, Supplier } from '~core/models';
import { FilterType } from '~shared/filters';
import { AutoUnsub, ID } from '~utils';

@Component({
	selector: 'contacts-page-app',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' },
	providers: [ListPageService]
})
export class ContactsPageComponent extends AutoUnsub implements OnInit {

	supplierId: ID;
	filterTypeEnum = FilterType;

	constructor(
		private route: ActivatedRoute,
		private contactSrv: ContactService,
		public listSrv: ListPageService<Contact, ContactService>,
		public dialogCommonSrv: DialogCommonService
	) { super(); }

	ngOnInit() {
		this.supplierId = this.route.parent.snapshot.params.id;
		this.listSrv.setup({
			entitySrv: this.contactSrv,
			searchedFields: ['name', 'email', 'phoneNumber', 'company', 'supplier.name'],
			entityMetadata: ERM.CONTACT,
			selectParams: { query: `supplier.id == "${this.supplierId}" AND deleted == false` },
			originComponentDestroy$: this._destroy$
		});
	}

	openNewContactDlg(supplier: Supplier) {
		this.dialogCommonSrv.openNewContactDlg(supplier).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
