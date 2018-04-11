import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { Store } from '@ngrx/store';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { fromDialog } from '~app/shared/dialog';
import { RegexpApp, DEFAULT_IMG, AutoUnsub } from '~app/app-root/utils';
import { AppFile, AppImage, Patch } from '~app/entity';
import { UserService } from '~app/features/user';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil, filter, tap, distinctUntilChanged } from 'rxjs/operators';


const addDlg = () => addDialog(SupplierNewContactDlgComponent, DialogName.CONTACT);


@Component({
	selector: 'supplier-new-contact-dlg-app',
	templateUrl: './supplier-new-contact-dlg.component.html',
	styleUrls: ['./supplier-new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierNewContactDlgComponent extends AutoUnsub implements OnInit {
	formGroup: FormGroup;
	dialogName = DialogName.CONTACT;
	/** preview image */
	preview$: Observable<AppImage>;
	private _preview: any = {};
	/** whather the dialog is for a new contact or an existing one */
	isNewContact = false;
	defaultImg = DEFAULT_IMG;

	@Input() contact = {
		id: '',
		name: '',
		jobTitle: '',
		email: '',
		phoneNumber: '',
		image: null
	};

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService, private cd: ChangeDetectorRef) {
		super();
	}

	ngOnInit() {
		if (this.isNewContact) {
			// when new contact the image is gonna be located in previewImg
			this.store.select(fromSupplierContact.selectState).pipe(
				takeUntil(this._destroy$),
				map(state => state.previewImg),
				distinctUntilChanged(),
				filter(preview => !!preview && Object.keys(preview).length > 0),
			).subscribe(preview => this.preview = preview);
		} else {
			// when updating old contact image is on the contact itself
			this.store.select(fromSupplierContact.selectOne(this.contact.id)).pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged(),
				map(state => state.image)
			).subscribe(image => this.preview = image);
		}

		this.formGroup = this.fb.group({
			name: [this.contact.name, Validators.required],
			jobTitle: this.contact.jobTitle,
			email: [this.contact.email, Validators.email],
			phoneNumber: [this.contact.phoneNumber, Validators.pattern(RegexpApp.PHONE)]
		});
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
		if (this.formGroup.valid) {
			const contact = this.formGroup.value;
			// we need to add the image to the contact before uploading
			contact.imageId = this._preview.id;
			contact.image = this._preview;
			this.store.dispatch(fromSupplierContact.Actions.create(this.formGroup.value));
			this.store.dispatch(fromDialog.Actions.close(this.dialogName));
		}
	}

	patch(propName: string, value: any) {
		/** we only do the patching when it's an existing contact */
		if (!this.isNewContact) {
			const patch: Patch = { id: this.contact.id, propName, value };
			this.store.dispatch(fromSupplierContact.Actions.patch(patch));
		}
	}

	onFilesAdded(files: Array<File>) {
		files.forEach(file => {
			// image creation is async because we need the base 64 to display it.
			AppImage.newInstance(file, this.userSrv.userId).then(appImg => {
				if (this.isNewContact)
					this.store.dispatch(fromSupplierContact.Actions.createImg(appImg));
				else
					this.store.dispatch(fromSupplierContact.Actions.changeImg(appImg, this.contact.id));
			});
		});
	}

	onClose() {
		// resetting the preview on close
		this.store.dispatch(fromSupplierContact.Actions.setPreview({}));
	}


}

addDlg();
