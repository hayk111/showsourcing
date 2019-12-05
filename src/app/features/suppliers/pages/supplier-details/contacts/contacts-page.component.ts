import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContactService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Contact, ERM } from '~core/models';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsub, ID } from '~utils';

@Component({
	selector: 'contacts-page-app',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' }
})
export class ContactsPageComponent extends AutoUnsub implements OnInit {

	supplierId: ID;

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

}
