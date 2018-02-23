import { Component, OnInit } from '@angular/core';
import { DialogName } from '~store/model/ui/dialog.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogActions } from '~store/action/ui/dialog.action';
import { Store } from '@ngrx/store';
import { SupplierActions } from '~suppliers';
import { Supplier } from '~suppliers';
import { UserService } from '~user';

@Component({
  selector: 'new-supplier-dlg-app',
  templateUrl: './new-supplier-dlg.component.html',
  styleUrls: ['./new-supplier-dlg.component.scss']
})
export class NewSupplierDlgComponent implements OnInit {
	name = DialogName.NEW_SUPPLIER;
	group: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService) {
		this.group = this.fb.group({
			name: [ '', Validators.required ]
		});
	}

  ngOnInit() {
  }


	onSubmit() {
		if (this.group.valid) {
			const name = this.group.value.name;
			this.store.dispatch(SupplierActions.add([ new Supplier(name, this.userSrv.getUserId())]));
			this.group.reset();
			this.store.dispatch(DialogActions.close(this.name));
		}
	}
}
