import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { ERM, Patch } from '~app/entity';
import { Category } from '~models';
import { ContactService } from '~app/features/supplier/services/contact.service';
import { Contact } from '~models';
import { UserService } from '~app/features/user';
import { DialogName, DialogService } from '~app/shared/dialog';
import { EditableFieldValue } from '~app/shared/editable-field/components/editable-field/editable-field-value.interface';
import { Product } from '~models';
import { Supplier, Tag } from '~models';
import { SupplierService } from '~app/features/supplier/services/supplier.service';

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
		private supplierSrv: SupplierService,
		private contactSrv: ContactService,
		private store: Store<any>,
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
	patch(patch: Patch) {
		// this.store.dispatch(fromSupplier.Actions.patch(patch));
		this.supplierSrv.updateSupplier({ id: patch.id, [patch.propName]: patch.value });
	}

	/**  */
	onItemCreated(efValue: EditableFieldValue) {
		switch (efValue.type) {
			case 'tag':
				this.onTagCreated(efValue.value);
				break;
			case 'category':
				this.onCategoryCreated(efValue.value);
				break;
		}
	}

	onItemAdded(efValue: EditableFieldValue) {
		switch (efValue.type) {
			case 'tag':
				// this.store.dispatch(fromSupplier.Actions.addTag(efValue.value, this.supplierId));
				break;
			case 'category':
				// this.store.dispatch(fromSupplier.Actions.addCategory(efValue.value, this.supplierId));
				break;
		}
	}

	onItemRemoved(efValue: EditableFieldValue) {
		switch (efValue.type) {
			case 'tag':
				// this.store.dispatch(fromSupplier.Actions.removeTag(efValue.value, this.supplierId));
				break;
			case 'category':
				// this.store.dispatch(fromSupplier.Actions.removeCategory(efValue.value, this.supplierId));
				break;
		}
	}

	onTagCreated(name: string) {
		const tag = new Tag({ name });
		// this.store.dispatch(fromSupplier.Actions.createTag(tag, this.supplierId));
	}

	onCategoryCreated(name: string) {
		const category = new Category({ name });
		// this.store.dispatch(fromSupplier.Actions.createCategory(category, this.supplierId));
	}

	openContactDlg(contact?: Contact) {
		const target = { entityId: this.supplierId, entityRepr: ERM.supplier };
		if (contact)
			this.dlgSrv.open(DialogName.CONTACT, { isNewContact: false, contact, supplierId: this.supplierId });
		// new contact dlg
		else
			this.dlgSrv.open(DialogName.CONTACT, { isNewContact: true, supplierId: this.supplierId });
	}
}
