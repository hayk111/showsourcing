import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Product, Contact } from '~models';
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

	detailGroup: FormGroup;
	emailGroup: FormGroup;
	pending = false;
	copyEmail = false;
	titles = ['review', 'recipient', 'confirmation'];
	maxInd = this.titles.length - 1;
	index = 0;
	@Input() contacts: Array<Contact>;
	@Input() product: Product;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		this.detailGroup = this.fb.group({
			title: ['', Validators.required],
			quantity: ['', Validators.required],
			description: ['', Validators.required]
		});
		this.emailGroup = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	ngAfterViewInit() {
		this.input.focus();
	}

	onSubmit() {
		if (this.index < this.maxInd)++this.index;
		else {
			// Send information
		}
	}

	addEmail() {
		this.contacts = [{ name: null, email: this.emailGroup.value.email, jobTitle: null }, ...this.contacts];
		this.emailGroup.reset();
	}

	previous() {
		this.index = (this.index > 0 && this.index <= this.maxInd) ? --this.index : this.index;
	}

	closeDlg() {
		this.dlgSrv.close();
	}

}
