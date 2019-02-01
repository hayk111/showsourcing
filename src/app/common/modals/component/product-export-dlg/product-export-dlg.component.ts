import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest, Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {
	selectedExport: '' | 'pdf' | 'xlsx' = '';
	// used to give props from the dialog container
	notifState = new ReplaySubject<NotificationType>(1);
	@Input() products: Product[];

	pending: boolean;

	constructor(
		private dlgSrv: DialogService,
		private exportSrv: ExportRequestService,
		private notifSrv: NotificationService,
		private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.notifState.pipe(
			tap(type => this.notifSrv.add({
				type,
				title: 'Exporting file',
				message: type === NotificationType.SUCCESS ? 'Export successfully completed' : 'Failed exporting files',
				timeout: 4000
			}))
		).subscribe();
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
			this.notifState.next(NotificationType.SUCCESS);
			saveAs(file, (request.format === 'pdf') ? 'product-sheet.pdf' : 'product-sheet.xls');
		},
			err => {
				this.pending = false;
				this.notifState.next(NotificationType.ERROR);
				this.dlgSrv.close();
			}
		);
	}
}
