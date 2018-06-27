import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ExportService } from '~features/products/services/export.service';
import { DialogService } from '~shared/dialog';


@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: '' | 'pdf' | 'excel' = '';
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
				this.dlgSrv.close(ProductExportDlgComponent);
			});
	}
}

