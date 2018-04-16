import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, takeUntil, filter, tap } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import {
	Patch, AppImage, fromImage, fromSupplier,
	Tag
} from '~entity';
import { Product, selectProducts } from '~product';
import { Supplier } from '~supplier';
import { fromTask, Task } from '~task';
import { fromDialog, DialogName } from '~app/shared/dialog';
import { UserService } from '~app/features/user';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Contact } from '~app/features/supplier/store/contacts/contact.model';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { fromSupplierProduct } from '~app/features/supplier/store/product/product.bundle';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	// currently displayed supplier
	supplier$: Observable<Supplier>;
	// product count for supplier displayed in the summary bar
	productCount$: Observable<number>;
	// tasks of the supplier so we can display how many of them there are
	tasks$: Observable<Array<Task>>;
	// the latest products for this supplier
	products$: Observable<Array<Product>>;
	images$: Observable<Array<AppImage>>;
	contacts$: Observable<Array<Contact>>;
	supplierId: string;
	// this is put in container because it will access the store
	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(takeUntil(this._destroy$), map(params => params.id));
		id$.subscribe(id => {
			this.store.dispatch(fromSupplier.Actions.focus(id));
		});

		this.supplier$ = this.store.select(fromSupplier.selectFocussed).pipe(
			filter(x => !!x),
			tap((supplier: Supplier) => this.supplierId = supplier.id));

		// this select the count for all entities we need it just for this one
		const productsCount$ = this.store.select(fromSupplier.selectProductCount);
		this.productCount$ = combineLatest(id$, productsCount$, (id, count) => count[id] || 0);
		this.tasks$ = this.store.select(fromTask.selectArray);

		this.products$ = this.store.select<any>(fromSupplierProduct.selectArray);
		this.images$ = this.store.select(fromImage.selectArray);
		this.contacts$ = this.store.select(fromSupplierContact.selectArray);
	}

	/** updates supplier */
	patch(patch: Patch) {
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	onTagAdded(tag: Tag) {
		this.store.dispatch(fromSupplier.Actions.addTag(tag, this.supplierId));
	}

	onTagRemoved(tag: Tag) {
		this.store.dispatch(fromSupplier.Actions.removeTag(tag, this.supplierId));
	}

	onTagCreated(tagName: string) {
		const tag = new Tag(tagName, this.userSrv.userId);
		this.store.dispatch(fromSupplier.Actions.createTag(tag, this.supplierId));
	}

	openContactDlg(contact?: Contact) {
		if (contact)
			this.store.dispatch(fromDialog.Actions.open(DialogName.CONTACT, { contact }));
		// new contact dlg
		else
			this.store.dispatch(fromDialog.Actions.open(DialogName.CONTACT, { isNewContact: true }));
	}
}
