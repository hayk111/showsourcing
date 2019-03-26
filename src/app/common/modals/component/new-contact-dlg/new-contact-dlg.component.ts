import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { mapTo, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ContactService } from '~entity-services';
import { Contact, Supplier } from '~models';
import { AutoUnsub, RegexpApp } from '~utils';

// different cases regarding the image upload and saving the contact
// 1. contact is not created yet and an image is pending
// 2. contact is not created yet and an image has been uploaded
// 3. contact is not created yet and and there is nothing with image
// 4. contact is modified and nothing with image
// 5. contact is modified and image uploaded
// 6. contact is modified and an image is pending
@Component({
	selector: 'new-contact-dlg-app',
	templateUrl: './new-contact-dlg.component.html',
	styleUrls: ['./new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewContactDlgComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	contactCreated$ = new ReplaySubject<boolean>(1);
	// supplier for which we are creating the contact
	@Input() supplier: Supplier;
	/** whether the dialog is for a new contact or an existing one */
	@Input() isNewContact = false;
	// we only take the contact id so we can reselect and have further updates
	@Input() contactId: string;
	contact$: Observable<Contact>;
	private contact: Contact;

	constructor(
		private fb: FormBuilder,
		private contactSrv: ContactService,
	) {
		super();
	}

	ngOnInit() {
		// creating the formGroup
		this.form = this.fb.group({
			name: ['', Validators.required],
			supplier: [this.supplier, Validators.required],
			jobTitle: '',
			email: ['', Validators.email],
			phoneNumber: ['', Validators.pattern(RegexpApp.PHONE)]
		});

		// create new contact if doesn't exist ( so we are only gonna update the contact after ward)
		if (this.isNewContact) {
			this.createContact().subscribe(this.contactCreated$);
		} else {
			this.contactCreated$.next(true);
		}
		// subscribing to the contact so we have updates
		this.contact$ = this.contactCreated$.pipe(
			switchMap(_ => this.contact$ = this.contactSrv.selectOne(this.contactId)),
			tap(contact => this.contact = contact),
			tap(contact => this.form.patchValue(contact)),
			takeUntil(this._destroy$)
		);
	}

	updateSupplier(item: any) {
		this.form.get('supplier').setValue(item);
		this.updateContact();
	}

	updateContact() {
		const contact = { ...this.form.value, id: this.contact.id };
		this.contactSrv.update(contact).subscribe();
	}

	createContact() {
		const contact = this.supplier ? new Contact({ supplier: { id: this.supplier.id } }) : new Contact({});
		return this.contactSrv.create(contact).pipe(
			tap(_ => {
				this.contactId = contact.id;
				this.isNewContact = false;
			}),
			mapTo(true)
		);
	}

}
