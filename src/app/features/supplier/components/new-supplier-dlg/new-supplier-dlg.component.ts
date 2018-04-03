import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogActions } from '~shared/dialog/store/dialog.action';
import { DialogName } from '~shared/dialog/models';
import { supplierActions } from '~supplier/supplier.action';
import { Supplier } from '~supplier/supplier.model';
import { UserService } from '~app/features/user';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';

const addDlg = () => addDialog(NewSupplierDlgComponent, DialogName.NEW_SUPPLIER);

@Component({
	selector: 'new-supplier-dlg-app',
	templateUrl: './new-supplier-dlg.component.html',
	styleUrls: ['./new-supplier-dlg.component.scss'],
})
export class NewSupplierDlgComponent implements OnInit {
	name = DialogName.NEW_SUPPLIER;
	group: FormGroup;

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService) {
		this.group = this.fb.group({
			name: ['', Validators.required],
		});
	}

	ngOnInit() { }

	onSubmit() {
		if (this.group.valid) {
			const name = this.group.value.name;
			this.store.dispatch(supplierActions.add([new Supplier(name, this.userSrv.userId)]));
			this.group.reset();
			this.store.dispatch(DialogActions.close(this.name));
		}
	}
}

addDlg();
