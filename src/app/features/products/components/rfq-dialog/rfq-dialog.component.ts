import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '~models';
import { AutoUnsub } from '~utils';
import { InputDirective } from '~shared/inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'rfq-dialog-app',
	templateUrl: './rfq-dialog.component.html',
	styleUrls: ['./rfq-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqDialogComponent extends AutoUnsub implements AfterViewInit, OnInit {

	group: FormGroup;
	pending = false;
	titles = ['review', 'recipient', 'confirmation'];
	index = 0;
	emails: Array<any>;
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
		this.input.focus();
	}

	onSubmit() {
		if (this.index < 2)++this.index;
		else {
			// Send information
		}
	}

	previous() {
		this.index = (this.index > 0 && this.index <= 2) ? --this.index : this.index;
	}

	closeDlg() {
		this.dlgSrv.close();
	}

}
