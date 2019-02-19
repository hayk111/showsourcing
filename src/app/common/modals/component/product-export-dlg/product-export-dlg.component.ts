import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ReplaySubject, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: 'pdf' | 'xls';
	@Input() targets: Product[] | Supplier[];
	@Input() type: 'pdf_product_page' | 'xls_product_list';

	pending: boolean;

	constructor(
		private dlgSrv: DialogService,
		private exportSrv: ExportRequestService,
		private notifSrv: NotificationService,
		private cdr: ChangeDetectorRef) { }

	ngOnInit() {

	}

	addNotif(type: NotificationType) {
		this.notifSrv.add({
			type,
			title: 'Exporting file',
			message: type === NotificationType.SUCCESS ? 'Export successfully completed' : 'Failed exporting files',
			timeout: 4000
		});
	}

	select(value: 'pdf' | 'xls') {
		this.selectedExport = value;
	}

	export() {
		this.pending = true;

		const request = new ExportRequest({
			type: this.type,
			format: this.selectedExport,
			query: (this.targets as any[]).map(target => `id == '${target.id}'`).join(' or ')
		});
		this.exportSrv.create(request).pipe(
			map(exp => {
				if (exp.status === 'rejected')
					throw new Error('Rejected');
				else return exp;
			}),
			switchMap(r => this.exportSrv.retrieveFile(r))
		).subscribe(file => {
			this.pending = false;
			this.cdr.detectChanges();
			this.dlgSrv.close();
			this.addNotif(NotificationType.SUCCESS);
			saveAs(file, (request.format === 'pdf') ? 'product-sheet.pdf' : 'product-sheet.xls');
		},
			err => {
				this.pending = false;
				this.addNotif(NotificationType.ERROR);
				this.dlgSrv.close();
			}
		);
	}
}
