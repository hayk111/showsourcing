import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { AutoUnsub, DEFAULT_IMG, RegexpApp } from '~utils';
import { AppImage } from '~models';
import { ContactService } from '~features/supplier/services/contact.service';
import { Contact } from '~models';
import { UserService } from '~features/user';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { DialogName } from '~shared/dialog/models/dialog-names.enum';
import { DialogService } from '~shared/dialog';

const addDlg = () => addDialog(NewContactDlgComponent, DialogName.CONTACT);


@Component({
	selector: 'new-contact-dlg-app',
	templateUrl: './new-contact-dlg.component.html',
	styleUrls: ['./new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewContactDlgComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	dialogName = DialogName.CONTACT;
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
		private userSrv: UserService,
		private cd: ChangeDetectorRef,
		private contactSrv: ContactService,
		private route: ActivatedRoute,
		private dlgSrv: DialogService
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
	get previewUrl() {
		if (!this._preview || Object.keys(this._preview).length === 0)
			return;
		// if the image is pending the base64 is in data else the url is at normal place
		return this._preview.data || this._preview.urls.url_400x300;
	}

	set preview(value: AppImage) {
		this._preview = value;
		// need to detect for changes since we aren't using any async pipe for it and OnPush change detection
		this.cd.markForCheck();
	}

	onSubmit() {
		// not checking if form group is valid because at the time of writting this an email cannot be empty
		// therefor the form will be invalid
		if (this.form.valid) {
			const contact = new Contact(this.form.value);
			// we need to add the image to the contact before uploading
			// contact.imageId = this._preview.id;
			// contact.image = this._preview;
			// this.store.dispatch(ContactActions.create(this.formGroup.value));
			this.contactSrv.createContact(contact, this.supplierId).subscribe();
			this.dlgSrv.close(this.dialogName);
		}
	}

	updateContact(prop: string, value: any) {
		if (!this.isNewContact) {
			const contact = { ...this.form.value, id: this.contact.id };
			this.contactSrv.updateContact(contact).subscribe();
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

addDlg();
