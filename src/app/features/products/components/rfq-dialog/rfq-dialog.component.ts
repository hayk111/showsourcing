import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Product, Contact } from '~models';
import { InputDirective } from '~shared/inputs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog';
import { ProductFeatureService } from '~features/products/services';
import { first } from 'rxjs/operators';

@Component({
	selector: 'rfq-dialog-app',
	templateUrl: './rfq-dialog.component.html',
	styleUrls: ['./rfq-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqDialogComponent implements AfterViewInit, OnInit {

	detailGroup: FormGroup;
	emailGroup: FormGroup;
	copyEmail = false;
	titles = ['review', 'recipient', 'confirmation'];
	maxInd = this.titles.length - 1;
	index = 0;
	selected = new Map<number, Contact>();

	@Input() product: Product;
	@ViewChild(InputDirective) input: InputDirective;

	_contacts: Array<Contact>;

	constructor(
		private productSrv: ProductFeatureService,
		private fb: FormBuilder,
		private dlgSrv: DialogService) { }

	ngOnInit() {
		this.detailGroup = this.fb.group({
			title: ['', Validators.required],
			quantity: ['', Validators.required],
			description: ['', Validators.required]
		});
		this.emailGroup = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});

		this.productSrv.getContacts(this.product.supplier.id).pipe(
			first()
		).subscribe(supp => this._contacts = supp.contacts);
	}

	ngAfterViewInit() {
		this.input.focus();
		if (this._contacts && this.product.supplier.officeEmail) {
			this._contacts.push({ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null });
		} else if (!this._contacts && this.product.supplier.officeEmail) {
			this._contacts = [{ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null }];
		} else {
			this._contacts = [];
		}
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

	selectMail(item: any) {
		// 0 is the position in the selection and 1 is the contact
		this.selected.set(item.index, item.contact);
	}

	unSelectMail(i: any) {
		this.selected.delete(i);
	}

}
