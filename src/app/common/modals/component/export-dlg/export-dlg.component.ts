import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, switchMap } from 'rxjs/operators';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { Router } from '@angular/router';

type exportFormat = 'pdf' | 'xls' | 'pictures';
type exportType = 'pdf_product_page' | 'xls_product_list' | 'product_image';

@Component({
	selector: 'export-dlg-app',
	templateUrl: './export-dlg.component.html',
	styleUrls: ['./export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDlgComponent implements OnInit {

	@Input() targets: Product[] | Supplier[];
	selectedFormat: exportFormat;
	selectedType: exportType;
	pending: boolean;

	constructor(
		public dlgSrv: DialogService,
		private router: Router,
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

	select(format: exportFormat, type: exportType) {
		this.selectedFormat = format;
		this.selectedType = type;
	}

	export() {
		this.pending = true;

		const request = new ExportRequest({
			type: this.selectedType,
			format: this.selectedFormat,
			query: (this.targets as any[]).map(target => `id == '${target.id}'`).join(' or ')
		});
		this.exportSrv.create(request).pipe(
			map(exp => {
				if (exp.status === 'rejected')
					throw new Error('Rejected');
				else return exp;
			}),
			switchMap(r => this.exportSrv.retrieveFile(r))
		).subscribe(({ file, name }) => {
			this.pending = false;
			this.cdr.detectChanges();
			this.dlgSrv.close();
			this.addNotif(NotificationType.SUCCESS);
			saveAs(file, name);
		},
			err => {
				this.pending = false;
				this.addNotif(NotificationType.ERROR);
				this.dlgSrv.close();
			}
		);
	}

	goToExports() {
		this.router.navigate(['settings', 'exports']);
		this.dlgSrv.close();
	}
}
