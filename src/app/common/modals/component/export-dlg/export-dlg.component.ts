import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ProductService } from '~core/entity-services';
import { ExportRequestService } from '~entity-services/export-request/export-request.service';
import { ExportRequest, Product, Supplier } from '~models';
import { DialogService } from '~shared/dialog/services';

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
	// when we want to export by Filter we use query instead of targets
	@Input() query: string;
	selectedFormat: ExportFormat;
	selectedType: ExportType;

	// when exportRequest Object is created we use another view
	requestCreated = false;
	// if the export it is ready on the backend
	fileReady = false;
	exportReq: ExportRequest;
	length$ = new BehaviorSubject(0);

	constructor(
		public dlgSrv: DialogService,
		private router: Router,
		private exportSrv: ExportRequestService,
		private productSrv: ProductService,
		private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		if (this.query)
			this.productSrv.queryCount(this.query).pipe(take(1)).subscribe(len => this.length$.next(len));
		else
			this.length$.next(this.targets.length);
	}

	select({ format, type }: { format: ExportFormat, type: ExportType }) {
		this.selectedFormat = format;
		this.selectedType = type;
	}

	export() {
		const query = this.query ? this.query : (this.targets as any[]).map(target => `id == '${target.id}'`).join(' or ');
		const request = new ExportRequest({
			type: this.selectedType,
			format: this.selectedFormat,
			query
		});

		this.requestCreated = true;
		this.cdr.detectChanges();

		this.exportSrv.create(request).pipe(
			switchMap(exp => this.exportSrv.isExportReady(exp))
		).subscribe(exp => {
			this.exportReq = exp;
			this.fileReady = true;
			this.cdr.detectChanges();
		},
			err => this.dlgSrv.close()
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
