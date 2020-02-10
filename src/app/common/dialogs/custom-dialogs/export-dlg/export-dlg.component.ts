import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ERMService } from '~core/erm';
import { ExportRequestService } from '~core/erm';
import { EntityName, ERM, ExportRequest, Product, Sample, Supplier, Task } from '~core/erm';
import { DialogService } from '~shared/dialog/services';

export type ExportFormat = 'pdf' | 'xls' | 'pictures';
export type ExportType = 'pdf_product_page' | 'xls_product_list' | 'product_image' | 'xls_supplier_list'
	| 'xls_sample_list' | 'xls_task_list';
export type ExportEntity = Product | Supplier | Sample | Task;

@Component({
	selector: 'export-dlg-app',
	templateUrl: './export-dlg.component.html',
	styleUrls: ['./export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDlgComponent implements OnInit {

	@Input() targets: ExportEntity[] = [];
	@Input() type: EntityName;
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
	canExportPdf = false;
	canExportImages = false;

	constructor(
		public dlgSrv: DialogService,
		private router: Router,
		private exportSrv: ExportRequestService,
		private ermService: ERMService,
		private cdr: ChangeDetectorRef) { }

	ngOnInit() {
		this.setExportData();
	}

	select({ format, type }: { format: ExportFormat, type: ExportType }) {
		this.selectedFormat = format;
		this.selectedType = type;
	}

	export() {
		const query = this.query ? this.query : (this.targets as ExportEntity[]).map(target => `id == '${target.id}'`).join(' or ');
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

	private setExportData() {
		if (!this.type)
			throw Error(`you have to set a type for the export`);

		const service = this.ermService.getGlobalService(ERM.getEntityMetadata(this.type));
		const selectCount$ = service.selectCount(this.query).pipe(take(1));
		// this switch case is mainly done so we know which types can export pdf or images or both
		switch (this.type) {
			case EntityName.PRODUCT:
				this.canExportPdf = true;
				this.canExportImages = true;

				this.query ?
					selectCount$.subscribe(len => this.length$.next(len)) :
					this.length$.next(this.targets.length);
				break;
			case EntityName.SUPPLIER:
				this.query ?
					selectCount$.subscribe(len => this.length$.next(len)) :
					this.length$.next(this.targets.length);
				break;
			case EntityName.SAMPLE:
				this.query ?
					selectCount$.subscribe(len => this.length$.next(len)) :
					this.length$.next(this.targets.length);
				break;
			case EntityName.TASK:
				this.query ?
					selectCount$.subscribe(len => this.length$.next(len)) :
					this.length$.next(this.targets.length);
				break;
			default:
				throw Error(`there is no type: "${this.type}" defined for exports`);
		}
	}
}
