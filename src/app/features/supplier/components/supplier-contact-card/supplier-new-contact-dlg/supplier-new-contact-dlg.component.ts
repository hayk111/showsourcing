import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { Store } from '@ngrx/store';
import { fromSupplierContact } from '~app/features/supplier/store/contacts/contact.bundle';
import { fromDialog } from '~app/shared/dialog';
import { RegexpApp, DEFAULT_IMG } from '~app/app-root/utils';
import { AppFile } from '~app/entity';
import { UserService } from '~app/features/user';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';


const addDlg = () => addDialog(SupplierNewContactDlgComponent, DialogName.NEW_CONTACT);


@Component({
	selector: 'supplier-new-contact-dlg-app',
	templateUrl: './supplier-new-contact-dlg.component.html',
	styleUrls: ['./supplier-new-contact-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierNewContactDlgComponent implements OnInit {
	formGroup: FormGroup;
	dialogName = DialogName.NEW_CONTACT;
	preview = '';
	defaultImg = DEFAULT_IMG;

	constructor(private fb: FormBuilder, private store: Store<any>, private userSrv: UserService, private imageHttp: ImageHttpService) {
		this.formGroup = this.fb.group({
			name: ['', Validators.required],
			jobTitle: '',
			email: ['', Validators.email],
			phoneNumber: ['', Validators.pattern(RegexpApp.PHONE)]
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		if (this.formGroup.valid) {
			this.store.dispatch(fromSupplierContact.Actions.create(this.formGroup.value));
			this.store.dispatch(fromDialog.Actions.close(this.dialogName));
		}
	}

	onFilesAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		// this.store.dispatch(fromSupplierContact.Actions.)
	}

}

addDlg();
