import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { Store } from '@ngrx/store';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { fromDialog } from '~app/shared/dialog';
import { RegexpApp, DEFAULT_IMG, AutoUnsub } from '~app/app-root/utils';
import { AppFile, AppImage } from '~app/entity';
import { UserService } from '~app/features/user';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil, filter } from 'rxjs/operators';


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
	preview$: Observable<AppImage>;
	defaultImg = DEFAULT_IMG;
	@Input()
	set contact(value) {
		// copy so we can modify sealed
		this._contact = { ...value };
	}
	get contact() {
		return this._contact;
	}
	private _contact = {
		name: '',
		jobTitle: '',
		email: '',
		phoneNumber: '',
		image: null
	};

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService, ) {
		super();
	}

	ngOnInit() {
		this.preview$ = this.store.select(fromSupplierContact.selectState).pipe(
			map(state => state.previewImg),
			filter(preview => !!preview)
		);
		this.preview$.pipe(takeUntil(this._destroy$)).subscribe(preview => this.contact.image = preview);
		this.formGroup = this.fb.group({
			name: [this.contact.name, Validators.required],
			jobTitle: this.contact.jobTitle,
			email: [this.contact.email, Validators.email],
			phoneNumber: [this.contact.phoneNumber, Validators.pattern(RegexpApp.PHONE)]
		});
	}

	onSubmit() {

		if (this.formGroup.valid) {
			// if (this.newContact) {
			// 	const contact = this.formGroup.value;
			// 	// we need to add the image to the contact before uploading
			// 	contact.imageId = this.contact.image.id;
			// 	this.store.dispatch(fromSupplierContact.Actions.create(this.formGroup.value));
			// } else {

			// }

			this.store.dispatch(fromDialog.Actions.close(this.dialogName));
		}
	}

	onFilesAdded(files: Array<File>) {
		files.forEach(file => {
			// image creation is async because we need the base 64 to display it.
			AppImage.newInstance(file, this.userSrv.userId).then(appImg => {
				this.store.dispatch(fromSupplierContact.Actions.createImg(appImg));
			});
		});
	}


}

addDlg();
