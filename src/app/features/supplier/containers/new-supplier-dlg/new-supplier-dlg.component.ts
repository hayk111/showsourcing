import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DialogActions } from '~shared/dialog/store/dialog.action';
import { DialogName } from '~shared/dialog/models';
import { supplierActions } from '~supplier/supplier.action';
import { Supplier } from '~supplier/supplier.model';
import { UserService } from '~app/features/user';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { RegexpApp, AutoUnsub } from '~app/app-root/utils';
import { InputDirective } from '~app/shared/inputs';
import { takeUntil } from 'rxjs/operators';
import { selectNewSupplierDialogPending } from '~app/features/supplier/store';
import { NewSupplierDlgActions } from '~app/features/supplier/store/new-supplier-dlg/new-supplier-dlg.actions';
import { SupplierService } from '~app/features/supplier/services/supplier.service';
import { Router } from '@angular/router';

const addDlg = () => addDialog(NewSupplierDlgComponent, DialogName.NEW_SUPPLIER);

@Component({
	selector: 'new-supplier-dlg-app',
	templateUrl: './new-supplier-dlg.component.html',
	styleUrls: ['./new-supplier-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSupplierDlgComponent extends AutoUnsub implements OnInit, AfterViewInit {
	name = DialogName.NEW_SUPPLIER;
	group: FormGroup;
	pending = false;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private store: Store<any>,
		private userSrv: UserService,
		private cd: ChangeDetectorRef,
		private supplierSrv: SupplierService,
		private router: Router) {
		super();
		this.group = this.fb.group({
			name: ['', Validators.required],
		});
	}

	ngOnInit() {
		this.store.select(selectNewSupplierDialogPending).pipe(
			takeUntil(this._destroy$)
		).subscribe(pending => {
			this.pending = pending;
			// mark for check as we are not using async and we are using on push
			this.cd.markForCheck();
		});
	}

	// focus input after view init
	ngAfterViewInit() {
		// setTimeout because we can't yet see the input
		setTimeout(() => this.input.focus(), 0);
	}


	onSubmit() {
		if (this.group.valid) {
			this.pending = true;
			const name = this.group.value.name;
			const supplier = { name };
			// this.store.dispatch(NewSupplierDlgActions.createSupplier(supplier));
			this.supplierSrv.createSupplier({ name })
				.pipe(takeUntil(this._destroy$))
				.subscribe(id => {
					this.pending = false;
					this.router.navigate(['/supplier', 'details', id]);
					this.store.dispatch(DialogActions.close(name));
				});
		}
	}
}

addDlg();
