import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
import { map, takeUntil } from 'rxjs/operators';


const addDlg = () => addDialog(SupplierNewContactDlgComponent, DialogName.NEW_CONTACT);


@Component({
	selector: 'supplier-new-contact-dlg-app',
	templateUrl: './supplier-new-contact-dlg.component.html',
	styleUrls: ['./supplier-new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierNewContactDlgComponent extends AutoUnsub implements OnInit {
	formGroup: FormGroup;
	dialogName = DialogName.NEW_CONTACT;
	preview$: Observable<AppImage>;
	preview: AppImage;
	defaultImg = DEFAULT_IMG;

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService,
		private imageHttp: ImageHttpService) {
		super();
		this.formGroup = this.fb.group({
			name: ['', Validators.required],
			jobTitle: '',
			email: ['', Validators.email],
			phoneNumber: ['', Validators.pattern(RegexpApp.PHONE)]
		});
	}

	ngOnInit() {
		this.preview$ = this.store.select(fromSupplierContact.selectState).pipe(
			map(state => state.previewImg)
		);

		this.preview$.pipe(takeUntil(this._destroy$)).subscribe(preview => this.preview = preview);
	}

	onSubmit() {
		if (this.formGroup.valid) {
			const contact = this.formGroup.value;
			// we need to add the image to the contact before uploading
			contact.imageId = this.preview.id;
			contact.image = this.preview;
			this.store.dispatch(fromSupplierContact.Actions.create(this.formGroup.value));
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
