import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogName } from '~app/shared/dialog';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { productActions, Product } from '~app/entity';
import { UserService } from '~app/features/user';

const addDlg = () => addDialog(NewProductDialogComponent, DialogName.NEW_PRODUCT);

@Component({
	selector: 'new-product-dialog-app',
	templateUrl: './new-product-dialog.component.html',
	styleUrls: ['./new-product-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProductDialogComponent {
	form: FormGroup;
	name = DialogName.NEW_PRODUCT;
	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService) {
		this.form = this.fb.group(
			{
				name: ['', Validators.required],
			}
		);
	}


	createProduct() {
		if (this.form.valid) {
			const name = this.form.value.name;
			this.store.dispatch(productActions.create(new Product(name, this.userSrv.userId)));
		}
	}

}

addDlg();

