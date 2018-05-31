import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { UserService } from '~features/user';
import { DialogName } from '~shared/dialog';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';

import { Product } from '~models';

// adding the dialog to the dialog list so we can map DialogName to this NewProductDialogComponent
const addDlg = () => addDialog(NewProductDialogComponent, DialogName.NEW_PRODUCT);

@Component({
	selector: 'new-product-dialog-app',
	templateUrl: './new-product-dialog.component.html',
	styleUrls: ['./new-product-dialog.component.scss'],
})
export class NewProductDialogComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	name = DialogName.NEW_PRODUCT;
	pending: boolean;

	constructor(private fb: FormBuilder, private userSrv: UserService) {
		super();
		this.form = this.fb.group(
			{
				name: ['', Validators.required],
				supplierId: ['', Validators.required],
				categoryId: ['', Validators.required]
			}
		);
	}

	ngOnInit() {
		// this.store.select(selectNewProductDlg).pipe(
		// 	takeUntil(this._destroy$)
		// ).subscribe((state: State) => this.pending = state.pending);
	}


	createProduct() {
		// if (this.form.valid) {
		// 	this.store.dispatch(productActions.create(new Product(this.form.value, this.userSrv.userId)));
		// }
	}

}

addDlg();

