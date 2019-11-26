import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ContactService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Contact, ERM } from '~core/models';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'contacts-page-app',
	templateUrl: './contacts-page.component.html',
	styleUrls: ['./contacts-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPageComponent extends AutoUnsub implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private contactSrv: ContactService,
		public litSrv: ListPageService<Contact, ContactService>,
		public dlgCommonSrv: DialogCommonService
	) { super(); }

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.litSrv.setup({
			entitySrv: this.contactSrv,
			searchedFields: ['name', 'email', 'phoneNumber', 'company', 'supplier.name'],
			entityMetadata: ERM.CONTACT,
			selectParams: { query: `supplier.id == "${id}" AND deleted == false` },
			originComponentDestroy$: this._destroy$
		});
	}

}
