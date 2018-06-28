import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Contact, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';

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
		private featureSrv: SupplierFeatureService,
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
			switchMap(id => this.featureSrv.selectOne(id))
		);
		// gettings his contacts
		this.contacts$ = id$.pipe(
			switchMap(id => this.featureSrv.selectContacts(id))
		);

		// getting his products
		this.products$ = id$.pipe(
			switchMap(id => this.featureSrv.getLatestProducts(id))
		);

		// this.tasks$ = id$.pipe(
		// 	switchMap(id => this.supplierSrv.getTasks(id))
		// );
	}

	/** updates supplier */
	patch(supplier: Supplier) {
		this.featureSrv.update(supplier)
			.subscribe();
	}

	openContactDlg(contact?: Contact) {
		if (contact)
			this.dlgSrv.open(NewContactDlgComponent, { isNewContact: false, contact, supplierId: this.supplierId });
		// new contact dlg
		else
			this.dlgSrv.open(NewContactDlgComponent, { isNewContact: true, supplierId: this.supplierId });
	}
}
