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
	copyEmail = false;
	titles = ['review', 'recipient', 'confirmation'];
	maxInd = this.titles.length - 1;
	index = 0;
	selected = new Map<number, Contact>();

	@Input() set contacts(contacts: Array<Contact>) {
		this._contacts = contacts ? contacts : [];
	}
	@Input() product: Product;
	@ViewChild(InputDirective) input: InputDirective;

	private _contacts: Array<Contact>;

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
		if (this.index < this.maxInd)
			++this.index;
		else {
			// Send information
			this.closeDlg();
		}
	}

	addEmail() {
		this._contacts.push({ name: null, email: this.emailGroup.value.email, jobTitle: null });
		this._contacts = [...this._contacts]; // change detection
		const len = this._contacts.length - 1;
		this.selected.set(len, this._contacts[len]);
		this.emailGroup.reset();
	}

	previous() {
		this.index = (this.index > 0 && this.index <= this.maxInd) ? --this.index : this.index;
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	toggleCopy() {
		this.copyEmail = this.copyEmail ? false : true;
	}

	selectMail(index: Array<any>) {
		// 0 is the position in the selection and 1 is the contact
		this.selected.set(index[0], index[1]);
	}

	unSelectMail(i: any) {
		this.selected.delete(i);
	}

}
