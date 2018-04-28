import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogName } from '~app/shared/dialog';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { productActions, Product } from '../../store/product';
import { UserService } from '~app/features/user';
import { selectNewProductDlg } from '~app/features/products/store';
import { AutoUnsub } from '~app/app-root/utils';
import { takeUntil } from 'rxjs/operators';
import { State } from '../../store/new-product-dlg/new-product-dlg.reducer';
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

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService) {
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
		this.store.select(selectNewProductDlg).pipe(
			takeUntil(this._destroy$)
		).subscribe((state: State) => this.pending = state.pending);
	}


	createProduct() {
		if (this.form.valid) {
			const name = this.form.value.name;
			this.store.dispatch(productActions.create(new Product(name, this.userSrv.userId)));
		}
	}

}

addDlg();

