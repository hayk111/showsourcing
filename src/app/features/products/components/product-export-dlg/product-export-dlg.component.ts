import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { DialogName, DialogService } from '~shared/dialog';
import { ExportService } from '~features/products/services/export.service';


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
	// used to give props from the dialog container
	selectedProducts: string[];
	get products() {
		return this.selectedProducts;
	}

	constructor(private dlgSrv: DialogService, private exportSrv: ExportService) { }

	ngOnInit() {
	}

	select(value: '' | 'pdf' | 'excel') {
		this.selectedExport = value;
	}

	export() {
		this.exportSrv.addProductsExport(this.selectedProducts, this.selectedExport)
			.subscribe(projects => {
				this.dlgSrv.close(this.dlgName);
			});
	}
}

addDlg();
