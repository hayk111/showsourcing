import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppImage, Contact } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub, DEFAULT_IMG, RegexpApp, PendingImage } from '~utils';
import { ContactService } from '~global-services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first } from 'rxjs/operators';

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
	/** preview image */
	private pendingImg;
	private uploadedImg;
	defaultImg = DEFAULT_IMG;
	// supplier for which we are creating the contact
	@Input() supplierId: string;
	/** whether the dialog is for a new contact or an existing one */
	@Input() isNewContact = false;
	@Input() contact: Contact = {
		id: '',
		name: '',
		jobTitle: '',
		email: '',
		phoneNumber: ''
	};

	constructor(
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private contactSrv: ContactService,
		private dlgSrv: DialogService,
		private uploader: UploaderService
	) {
		super();

	}

	ngOnInit() {
		// creating the formGroup using the contact so if we are editing an existing contact it will be the values of said contact
		this.form = this.fb.group({
			name: ['', Validators.required],
			jobTitle: '',
			email: ['', Validators.email],
			phoneNumber: ['', Validators.pattern(RegexpApp.PHONE)]
		});
		this.form.patchValue(this.contact);
	}

	/** gives image url */
	async onFilesAdded(files: File[]) {
		const file = files[0];
		this.pendingImg = new PendingImage(file);
		await this.pendingImg.createData();
		this.uploader.uploadImage(file).pipe(
			first()
		).subscribe(img => {
			// removing pending image
			this.pendingImg = undefined;
			this.uploadedImg = img;
			if (!this.isNewContact) {
				this.updateContact();
			}
		}, e => this.pendingImg = undefined);
	}

	updateContact() {
		if (!this.isNewContact) {
			const contact = { ...this.form.value, id: this.contact.id };
			this.addImageToContact(contact);
			this.contactSrv.update(contact).subscribe();
		}
		this.dlgSrv.close();
	}

	createContact() {
		if (this.isNewContact) {
			const contact = new Contact(this.form.value, this.supplierId);
			this.addImageToContact(contact);
			this.contactSrv.create(contact).subscribe();
		}
		this.isNewContact = false;
		this.dlgSrv.close();
	}

	private addImageToContact(contact) {
		if (this.uploadedImg) {
			contact.businessCardImage = this.uploadedImg;
		}
	}


	get image() {
		return this.pendingImg || this.uploadedImg || this.contact.businessCardImage;
	}

}
