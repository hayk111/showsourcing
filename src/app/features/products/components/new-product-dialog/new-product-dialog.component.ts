import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutoUnsub } from '~utils';
import { UserService } from '../../../../global-services';
import { DialogService } from '~shared/dialog';


@Component({
	selector: 'new-product-dialog-app',
	templateUrl: './new-product-dialog.component.html',
	styleUrls: ['./new-product-dialog.component.scss'],
})
export class NewProductDialogComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	component = NewProductDialogComponent;
	pending: boolean;

	constructor(private fb: FormBuilder, private dlgSrv: DialogService) {
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

	onClose() {
		this.dlgSrv.close(NewProductDialogComponent);
	}

}


