import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';


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

	constructor(private fb: FormBuilder) {
		this.formGroup = this.fb.group({
			name: ['', Validators.required],
			function: '',
			email: '',
			tel: ''
		});
	}

	ngOnInit() {
	}

}

addDlg();
