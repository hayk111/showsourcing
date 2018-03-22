import { Component, OnInit } from '@angular/core';
import { DialogName } from '~shared/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogActions } from '~shared/dialog';
import { Store } from '@ngrx/store';
import { supplierActions } from '~suppliers/store';
import { Supplier } from '~suppliers/models';
import { UserService } from '~user';

// TODO, make this dumb component ? Or should be in container.
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

	ngOnInit() {}

	onSubmit() {
		if (this.group.valid) {
			const name = this.group.value.name;
			this.store.dispatch(supplierActions.add([new Supplier(name, this.userSrv.userId)]));
			this.group.reset();
			this.store.dispatch(DialogActions.close(this.name));
		}
	}
}
