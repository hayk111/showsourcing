import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppImage, Contact } from '~models';
import { DialogService } from '~shared/dialog';
import { AutoUnsub, DEFAULT_IMG, RegexpApp } from '~utils';
import { ContactService } from '~global-services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first } from 'rxjs/operators';



@Component({
	selector: 'new-contact-dlg-app',
	templateUrl: './new-contact-dlg.component.html',
	styleUrls: ['./new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewContactDlgComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	/** preview image */
	preview$: Observable<AppImage>;
	private _preview: any = {};
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
	onFileAdded(files: File[]) {
		this.uploader.uploadImages(files).pipe(
			first()
		).subscribe(imgs => {
			// removing pending image
			this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		}, e => this._pendingImages = []);
	}

	onSubmit() {
		// not checking if form group is valid because at the time of writting this an email cannot be empty
		// therefor the form will be invalid
		if (this.form.valid) {
			const contact = new Contact(this.form.value, this.supplierId);
			// we need to add the image to the contact before uploading
			// contact.imageId = this._preview.id;
			// contact.image = this._preview;
			// this.store.dispatch(ContactActions.create(this.formGroup.value));
			this.contactSrv.create(contact).subscribe();
			this.dlgSrv.close();
		}
	}

	updateContact() {
		if (!this.isNewContact) {
			const contact = { ...this.form.value, id: this.contact.id };
			this.contactSrv.update(contact).subscribe();
		}
	}

	onFilesAdded(files: Array<File>) {
		// files.forEach(file => {
		// 	// image creation is async because we need the base 64 to display it.
		// 	AppImage.newInstance(file, this.userSrv.userId).then(appImg => {
		// 		if (this.isNewContact)
		// 			this.store.dispatch(ContactActions.createImg(appImg));
		// 		else
		// 			this.store.dispatch(ContactActions.changeImg(appImg, this.contact.id));
		// 	});
		// });
	}

}
