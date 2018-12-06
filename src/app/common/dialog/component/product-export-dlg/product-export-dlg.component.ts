import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { saveAs } from 'file-saver';
import { switchMap } from 'rxjs/operators';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest } from '~models';
import { DialogService } from '~shared/dialog/services';


@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: '' | 'pdf' | 'xlsx' = '';
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

	select(value: '' | 'pdf' | 'xlsx') {
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
				},
				suppliers: {}
			})
		});
		this.exportSrv.create(request).pipe(
			switchMap(r => this.exportSrv.retrieveFile(r))
		).subscribe(file => {
			this.pending = false;
			this.cdr.detectChanges();
			this.dlgSrv.close();
			saveAs(file, (request.format === 'pdf') ? 'product-sheet.pdf' : 'product-sheet.xls');
		});
	}
}