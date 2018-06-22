import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ContactService } from '~features/supplier/services/contact.service';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Contact, Product, Supplier } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { UserService } from '~shared/global-services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	// currently displayed supplier
	supplierId: string;
	supplier$: Observable<Supplier>;
	contacts$: Observable<Contact[]>;
	products$: Observable<Product[]>;
	// tasks$: Observable<Task[]>;

	constructor(
		private route: ActivatedRoute,
		private userSrv: UserService,
		private supplierSrv: SupplierFeatureService,
		private contactSrv: ContactService,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		// getting the id of the supplier
		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
			tap(id => this.supplierId = id)
		);

		// getting supplier
		this.supplier$ = id$.pipe(
			switchMap(id => this.supplierSrv.getById(id))
		);
		// gettings his contacts
		this.contacts$ = id$.pipe(
			switchMap(id => this.contactSrv.getContacts(id))
		);

		// getting his products
		this.products$ = id$.pipe(
			switchMap(id => this.supplierSrv.getLatestProducts(id))
		);

		// this.tasks$ = id$.pipe(
		// 	switchMap(id => this.supplierSrv.getTasks(id))
		// );
	}

	/** updates supplier */
	patch(supplier: Supplier) {
		this.supplierSrv.updateSupplier(supplier)
			.subscribe();
	}

	openContactDlg(contact?: Contact) {
		if (contact)
			this.dlgSrv.open(DialogName.CONTACT, { isNewContact: false, contact, supplierId: this.supplierId });
		// new contact dlg
		else
			this.dlgSrv.open(DialogName.CONTACT, { isNewContact: true, supplierId: this.supplierId });
	}
}
