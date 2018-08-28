import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '~models/supplier.model';
import { Contact } from '~models/contact.model';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { DialogService } from '~shared/dialog';
import { takeUntil, map, switchMap, tap } from 'rxjs/operators';
import { NewContactDlgComponent } from '~features/supplier/containers/new-contact-dlg/new-contact-dlg.component';

@Component({
	selector: 'supplier-activity-app',
	templateUrl: './supplier-activity.component.html',
	styleUrls: ['./supplier-activity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex'
	}
})
export class SupplierActivityComponent extends AutoUnsub implements OnInit {
	supplierId: string;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	/** Get stream feedName */
	feedName$: Observable<string[]>;

	constructor(
		private route: ActivatedRoute,
		private featureSrv: SupplierFeatureService,
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>) {
		super();
	}

	ngOnInit() {

		// getting the id of the supplier
		const id$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
			tap(id => this.supplierId = id)
		);

		// getting supplier
		this.supplier$ = id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id))
		);

		// getting his products
		this.products$ = id$.pipe(
			switchMap(id => this.featureSrv.getProducts(id))
		);

		// this.feedName$ = id$.pipe(
		// 	map(id => (['supplier_aggregated', id]))
		// );

	}

	/** updates supplier */
	patch(supplier: Supplier) {
		this.featureSrv.update(supplier)
			.subscribe();
	}

	openContactDlg(contact?: Contact) {
		if (contact)
			this.dlgSrv.openFromModule(NewContactDlgComponent, this.moduleRef, { isNewContact: false, contact, supplierId: this.supplierId });
		// new contact dlg
		else
			this.dlgSrv.openFromModule(NewContactDlgComponent, this.moduleRef, { isNewContact: true, supplierId: this.supplierId });
	}

	deleteContact(contact: Contact) {
		this.featureSrv.deleteContact(contact).subscribe();
	}
}
