import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { DEFAULT_USER_ICON } from '~utils';
import { Contact, Supplier } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { DialogService } from '~shared/dialog';
import { NewContactDlgComponent } from '~common/modals/component/new-contact-dlg/new-contact-dlg.component';
import { SupplierService } from '~core/entity-services';

@Component({
	selector: 'supplier-contact-card-app',
	templateUrl: './supplier-contact-card.component.html',
	styleUrls: ['./supplier-contact-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierContactCardComponent extends TrackingComponent implements OnInit {
	@Input() contacts = [];
	@Input() supplier: Supplier;
	@Output() newContact = new EventEmitter<null>();
	defaultImg = DEFAULT_USER_ICON;

	constructor(
		private dlgSrv: DialogService,
		private supplierSrv: SupplierService
	) {
		super();
	}

	ngOnInit() {
	}

	openContactDlg(contact?: any) {
		const isNewContact = !contact;
		this.dlgSrv.open(NewContactDlgComponent, { isNewContact, supplier: this.supplier });
	}

	deleteContact() {

	}

}
