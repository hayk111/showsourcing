import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { ExportRequestService } from '~global-services/export-request/export-request.service';
import { ExportRequest } from '~models';


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

	constructor(private dlgSrv: DialogService, private exportSrv: ExportRequestService) { }

	ngOnInit() {
	}

	select(value: '' | 'pdf' | 'excel') {
		this.selectedExport = value;
	}

	export() {
		const request = new ExportRequest({
			type: 'product',
			format: this.selectedExport
		});
		this.exportSrv.create(request)
			.subscribe(r => {
				// do whatever we need to
			});
	}
}

