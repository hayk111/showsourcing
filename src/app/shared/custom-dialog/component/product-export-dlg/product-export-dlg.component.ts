import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { DialogService } from '~shared/dialog';
import { ExportRequestService } from '~global-services/export-request/export-request.service';
import { ExportRequest, Product } from '~models';
import { saveAs } from 'file-saver/FileSaver';


@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: '' | 'pdf' | 'excel' = '';
	// used to give props from the dialog container
	selectedProducts: { id: string }[];
	get products() {
		return this.selectedProducts;
	}
	pending: boolean;

	constructor(private dlgSrv: DialogService, private exportSrv: ExportRequestService,
		private cdr: ChangeDetectorRef) { }

	ngOnInit() {
	}

	select(value: '' | 'pdf' | 'excel') {
		this.selectedExport = value;
	}

	export() {
		this.pending = true;
		const request = new ExportRequest({
			type: 'product',
			format: this.selectedExport,
			query: JSON.stringify({
				products: {
					query: this.products.map(product => `id == '${product.id}'`).join(' or ')
				}
			})
		});
		this.exportSrv.create(request).pipe(
			switchMap(r => this.exportSrv.retrieveFile(r))
		).subscribe(file => {
			this.pending = false;
			this.cdr.detectChanges();
			// this.dlgSrv.close();
			saveAs(file, (request.format === 'pdf') ? 'product-sheet.pdf' : 'product-sheet.xls');
		});
	}
}
