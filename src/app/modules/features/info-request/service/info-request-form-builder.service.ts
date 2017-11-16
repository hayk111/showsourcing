import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { telValidator } from '../../../shared/inputs/validators/tel.validator';
import { intValidator } from '../../../shared/inputs/validators/int.validator';
import { urlValidator } from '../../../shared/inputs/validators/url.validator';
import { Company } from '../../../shared/company/interfaces/company.interface';


// naive phone regex. Best regex for phone number is to allow everything imo, but this could help for accidental typos..
// found here https://www.regexpal.com/93652

@Injectable()
export class InfoRequestFormBuilderService {
	companyForm: FormGroup;
	namesForm: FormGroup;
	addressForm: FormGroup;
	// there is a form for the main company contact
	// and one for multiple individual contacts
	contactForm: FormGroup;
	contactsForm: FormArray;

	private req = Validators.required;
	private reqTel = Validators.compose([Validators.required, telValidator]);
	private reqNum = Validators.compose([Validators.required, intValidator]);
	private reqEmail = Validators.compose([Validators.required, Validators.email]);
	private urlVal = urlValidator;


	constructor(private fb: FormBuilder, private store: Store<any>) {
		this.createForm();
		this.store.select('company')
			.subscribe(comp => this.onCompanyReceived(comp));
	}

	createForm() {
		this.createNameForm();
		this.createAddressForm();
		this.createContactForm();
		this.createContactsForm();
		this.companyForm = this.fb.group({
			names: this.namesForm,
			address: this.addressForm,
			contact: this.contactForm,
			contacts: this.contactsForm
		});
	}

	private createNameForm() {
		this.namesForm = this.fb.group({
			legalName: ['', this.req ],
			tradingName: [''],
			brandNames: ['']
		});
	}

	private createAddressForm() {
		this.addressForm = this.fb.group({
			fullAddress: ['', this.req ],
			city: ['', this.req ],
			zip: ['', this.reqNum ],
			state: ['', this.req ],
			country: ['', this.req ]
		});
	}

	private createContactForm() {
		this.contactForm = this.fb.group({
			website: ['http://', this.urlVal ],
			tel: ['', this.reqTel ],
			email: ['', this.reqEmail ],
		});
	}

	private createContactsForm() {
		this.contactsForm = this.fb.array([]);
		this.addPersonContactForm();
	}

	private onCompanyReceived(company: Company) {
		const c = company.contacts;
		if (c && c.length > 1) {
			for (let i = 1; i < c.length; i++) {
				this.addPersonContactForm();
			}
		}
		this.companyForm.patchValue(company);
	}

	addPersonContactForm() {
		const group: FormGroup = this.fb.group({
			name: ['', this.req ],
			function: ['', this.req ],
			tel: ['', this.reqTel ],
			email: ['', this.reqEmail ],
		});
		this.contactsForm.push(group);
	}
}
