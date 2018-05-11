import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  combineLatest } from 'rxjs';
import { map, switchMap, takeUntil, filter, tap } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import {
	Patch, AppImage, fromImage, fromSupplier,
	Tag,
	ERM
} from '~entity';
import { Product } from '~feature/products/store/product/product.model';
import { Supplier } from '~supplier';
import { fromTask, Task } from '~task';
import { fromDialog, DialogName } from '~app/shared/dialog';
import { UserService } from '~app/features/user';
import { Contact } from '~app/features/supplier/store/contacts/contact.model';
import { selectLatestProductsArray, selectContactArray, selectFocusedSupplier } from '~app/features/supplier/store';
import { EditableFieldValue } from '~app/shared/editable-field/components/editable-field/editable-field-value.interface';
import { Category } from '~entity/store/category/category.model';
import { SupplierDetailsAction } from '~app/features/supplier/store/supplier-details/supplier-details.action';
import { Apollo } from 'apollo-angular';
import { SupplierService } from '~app/features/supplier/services/supplier.service';
import { ContactService } from '~app/features/supplier/services/contact.service';

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
	tasks$: Observable<Task[]>;
	// this is put in container because it will access the store
	constructor(
		private route: ActivatedRoute,
		private userSrv: UserService,
		private supplierSrv: SupplierService,
		private contactSrv: ContactService,
		private store: Store<any>) {
		super();
	}

	ngOnInit() {

		const id$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
			tap(id => this.supplierId = id)
		);

		this.supplier$ = id$.pipe(
			switchMap(id => this.supplierSrv.getById(id))
		);

		this.contacts$ = id$.pipe(
			switchMap(id => this.contactSrv.getContacts(id))
		);

		this.products$ = id$.pipe(
			switchMap(id => this.supplierSrv.getProducts(id))
		);

		// this.tasks$ = id$.pipe(
		// 	switchMap(id => this.supplierSrv.getTasks(id))
		// );
	}

	/** updates supplier */
	patch(patch: Patch) {
		// this.store.dispatch(fromSupplier.Actions.patch(patch));
		this.supplierSrv.editSupplier({ id: patch.id, [patch.propName]: patch.value });
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

	onTagCreated(tagName: string) {
		const tag = new Tag(tagName, this.userSrv.userId);
		// this.store.dispatch(fromSupplier.Actions.createTag(tag, this.supplierId));
	}

	onCategoryCreated(categoryName: string) {
		const category = new Category(categoryName, this.userSrv.userId);
		// this.store.dispatch(fromSupplier.Actions.createCategory(category, this.supplierId));
	}

	openContactDlg(contact?: Contact) {
		const target = { entityId: this.supplierId, entityRepr: ERM.supplier };
		if (contact)
			this.store.dispatch(fromDialog.Actions.open(DialogName.CONTACT, { isNewContact: false, contact, supplierId: this.supplierId }));
		// new contact dlg
		else
			this.store.dispatch(fromDialog.Actions.open(DialogName.CONTACT, { isNewContact: true, supplierId: this.supplierId }));
	}
}
