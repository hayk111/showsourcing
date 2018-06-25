import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { UserService } from '../../../../global-services';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { InputDirective } from '~shared/inputs';
import { DialogName } from '~shared/dialog/models';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { DialogService } from '~shared/dialog';
import { Supplier } from '~models/supplier.model';


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
		private featureSrv: SupplierFeatureService,
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
			const supplier = new Supplier({ name });
			this.featureSrv.create(supplier)
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
