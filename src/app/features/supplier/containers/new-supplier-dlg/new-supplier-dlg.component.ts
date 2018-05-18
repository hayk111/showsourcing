import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { UserService } from '~app/features/user';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { InputDirective } from '~app/shared/inputs';
import { DialogName } from '~shared/dialog/models';
import { SupplierService } from '~app/features/supplier/services/supplier.service';
import { DialogService } from '~app/shared/dialog';


const addDlg = () => addDialog(NewSupplierDlgComponent, DialogName.NEW_SUPPLIER);

@Component({
	selector: 'new-supplier-dlg-app',
	templateUrl: './new-supplier-dlg.component.html',
	styleUrls: ['./new-supplier-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSupplierDlgComponent extends AutoUnsub implements AfterViewInit {
	name = DialogName.NEW_SUPPLIER;
	group: FormGroup;
	pending = false;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private userSrv: UserService,
		private cd: ChangeDetectorRef,
		private supplierSrv: SupplierService,
		private router: Router,
		private dlgSrv: DialogService) {
		super();
		this.group = this.fb.group({
			name: ['', Validators.required],
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
			this.supplierSrv.createSupplier({ name })
				.pipe(takeUntil(this._destroy$))
				.subscribe(id => {
					this.pending = false;
					this.router.navigate(['/supplier', 'details', id]);
					this.dlgSrv.close(this.name);
				});
		}
	}
}

addDlg();
