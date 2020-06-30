import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take, first } from 'rxjs/operators';
import { DialogService } from '~shared/dialog/services';
import { Typename } from '~core/erm3/typename.type';
import { ApiLibService } from '~core/api-lib';
import { Request, Export, Product, Supplier, Sample, Task } from '~core/erm3/models';

export enum ExportFormat {
	PDF = 'PDF',
	XLS = 'XLS',
	IMAGE = 'IMAGE',
}
export enum ExportTarget {
	SUPPLIER = 'SUPPLIER',
	PRODUCT = 'PRODUCT',
	CONTACT = 'CONTACT',
	SAMPLE = 'SAMPLE',
}
export type ExportEntity = Product | Supplier | Sample | Task;

@Component({
	selector: 'export-dialog-app',
	templateUrl: './export-dialog.component.html',
	styleUrls: ['./export-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportDialogComponent implements OnInit {
	@Input() targets: ExportEntity[] = [];
	@Input() typename: Typename;
	// when we want to export by Filter we use query instead of targets
	@Input() query: string;
	selectedFormat: ExportFormat;

	// when exportRequest Object is created we use another view
	requestCreated = false;
	// if the export it is ready on the backend
	fileReady = false;
	exportReq: Export;
	count$ = new BehaviorSubject(0);
	canExportPdf = false;
	canExportImages = false;

	constructor(
		public dlgSrv: DialogService,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private apiLibSrv: ApiLibService
	) {}

	ngOnInit() {
		this.setExportData();
	}

	select({ format }: { format: ExportFormat }) {
		this.selectedFormat = format;
	}

	/** create an export and check when it's ready on the backend. */
	export() {
		// const query = this.query ? this.query : (this.targets as ExportEntity[]).map(target => `id == '${target.id}'`).join(' or ');
		const query = 'what exactly should be the query ? apollo query option ? If not, how to pass params ?'; // TODO adapt the query
		const request = {
			target: ExportTarget[this.typename.toUpperCase()],
			format: this.selectedFormat,
			query,
		};
		this.requestCreated = true;
		this.cdr.detectChanges();
		this.apiLibSrv.db
			.create('Export', [request as any])
			.pipe
			// switchMap(exp => this.exportSrv.isExportReady(exp)) // TODO implement isExportReady
			()
			.subscribe(
				(exp) => {
					this.exportReq = exp[0];
					this.fileReady = true;
					this.cdr.detectChanges();
				},
				(err) => this.dlgSrv.cancel()
			);
	}

	/** download the file if it's ready */
	downloadFile() {
		// if (this.exportReq && this.exportReq.status === 'ready')
		// 	this.exportSrv.retrieveFile(this.exportReq).subscribe(({ file, name }) => {
		// 		saveAs(file, name);
		// 		this.dlgSrv.close();
		// 	});
	}

	/** navigate to the export table page. */
	goToExports() {
		this.router.navigate(['settings', 'exports']);
		this.dlgSrv.close();
	}

	/** get number of entities to export and specify pdf/images exports if products */
	private setExportData() {
		// Only Product can export pdf and images
		if (this.typename === 'Product') {
			this.canExportPdf = true;
			this.canExportImages = true;
		}
		// TODO add filters
		const selectCount$ = this.apiLibSrv.db.find(this.typename, null, null).count$;
		this.query
			? selectCount$.subscribe((len) => this.count$.next(len))
			: this.count$.next(this.targets.length);
	}
}
