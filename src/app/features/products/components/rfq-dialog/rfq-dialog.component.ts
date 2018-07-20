import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'app-rfq-dialog',
	templateUrl: './rfq-dialog.component.html',
	styleUrls: ['./rfq-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqDialogComponent extends AutoUnsub implements AfterViewInit, OnInit {

	group: FormGroup;
	pending = false;
	@Input() product: Product;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		this.group = this.fb.group({
			title: ['', Validators.required],
			quantity: ['', Validators.required],
			description: ['', Validators.required]
		});
	}

	ngAfterViewInit() {
		setTimeout(() => this.input.focus(), 0);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

}
