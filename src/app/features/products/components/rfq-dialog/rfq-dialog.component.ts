import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';
import { ExternalRequestService } from '~global-services';
import { Contact, ExternalRequest, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

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
		private externalReqSrv: ExternalRequestService,
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
		).subscribe(supp => {
			this._contacts = supp.contacts;
			if (this.product.supplier.officeEmail)
				this._contacts.push({ name: this.product.supplier.name || 'Unnamed', email: this.product.supplier.officeEmail, jobTitle: null });
		});
	}

	ngAfterViewInit() {
		this.input.focus();
	}

	onSubmit() {
		if (this.index < this.maxInd)
			++this.index;
		else {
			const exportData = new ExternalRequest({
				name: this.detailGroup.get('title').value,
				description: this.detailGroup.get('description').value,
				targetedMOQ: this.detailGroup.get('quantity').value,
				recipients: this._contacts.map(contact => contact.name),
				supplier: this.product.supplier // care if empty
			});

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
