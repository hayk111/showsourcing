import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { DialogName } from '~app/shared/dialog';

const addDlg = () => addDialog(ProductExportDlgComponent, DialogName.EXPORT);

@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: '' | 'pdf' | 'excel' = '';
	dlgName = DialogName.EXPORT;
	constructor() { }

	ngOnInit() {
	}

	select(value: '' | 'pdf' | 'excel') {
		this.selectedExport = value;
	}
}

addDlg();
