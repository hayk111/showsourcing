import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { switchMap } from 'rxjs/operators';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';

type ExportFormat = 'pdf' | 'xls' | 'pictures';
type ExportType = 'pdf_product_page' | 'xls_product_list' | 'product_image';

@Component({
	selector: 'export-dlg-app',
	templateUrl: './export-dlg.component.html',
	styleUrls: ['./export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDlgComponent implements OnInit {

	@Input() targets: Product[] | Supplier[];
	selectedFormat: ExportFormat;
	selectedType: ExportType;

	pending = false;
	// when exportRequest Object is created we use another view
	requestCreated = false;
	// if the export it is ready on the backend
	fileReady = false;
	exportReq: ExportRequest;

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

	select(selected: { format: ExportFormat, type: ExportType }) {
		this.selectedFormat = selected.format;
		this.selectedType = selected.type;
	}

	export() {
		this.pending = true;
		this.cdr.detectChanges();

		const request = new ExportRequest({
			type: this.selectedType,
			format: this.selectedFormat,
			query: (this.targets as any[]).map(target => `id == '${target.id}'`).join(' or ')
		});

		this.exportSrv.create(request).pipe(
			switchMap(exp => {
				if (exp.status === 'rejected')
					throw new Error('Rejected');
				this.pending = false;
				this.requestCreated = true;
				this.cdr.detectChanges();
				return this.exportSrv.waitForOne(`id == "${exp.id}" AND status == "ready"`);
			}),
		).subscribe(exp => {
			this.exportReq = exp;
			this.fileReady = true;
			this.cdr.detectChanges();
			this.addNotif(NotificationType.SUCCESS);
		},
			err => {
				this.pending = false;
				this.addNotif(NotificationType.ERROR);
				this.dlgSrv.close();
			}
		);
	}

	downloadFile() {
		if (this.exportReq && this.exportReq.status === 'ready')
			this.exportSrv.retrieveFile(this.exportReq).subscribe(({ file, name }) => {
				saveAs(file, name);
				this.dlgSrv.close();
			});
	}

	goToExports() {
		this.router.navigate(['settings', 'exports']);
		this.dlgSrv.close();
	}
}
