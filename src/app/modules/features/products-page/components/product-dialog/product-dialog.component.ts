import { Component, OnInit } from '@angular/core';
import { DialogNames } from '../../../../shared/dialog/dialogs.enum';

@Component({
	selector: 'product-dialog-app',
	templateUrl: './product-dialog.component.html',
	styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
	dlgName = DialogNames.PRODUCT;

	constructor() { }

	ngOnInit() {
	}

}
