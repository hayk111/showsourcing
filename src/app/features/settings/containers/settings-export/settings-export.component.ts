import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ExportRequestService } from '~core/entity-services/export-request/export-request.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TrackingComponent } from '~utils';
import { first } from 'rxjs/operators';

@Component({
	selector: 'settings-export-app',
	templateUrl: './settings-export.component.html',
	styleUrls: ['./settings-export.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsExportComponent extends TrackingComponent implements OnInit, AfterViewInit {

	erm = ERM;

	constructor(
		private exportSrv: ExportRequestService,
		public listSrv: ListPageService<ExportRequest, ExportRequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.EXPORT,
			entitySrv: this.exportSrv,
			searchedFields: ['format', 'status', 'createdBy.firstName', 'createdBy.lastName'],
			entityMetadata: ERM.EXPORT_REQUEST,
			initialFilters: []
		});
	}

	ngAfterViewInit() {
		// we need this refetch on after view init, otherwise if we come from the redirection of the
		// export-dlg.component we won't see the new request created
		this.listSrv.refetch().pipe(first()).subscribe();
	}

	downloadOne(exportReq: ExportRequest) {
		if (exportReq && exportReq.status === 'ready')
			this.exportSrv.retrieveFile(exportReq).subscribe(({ file, name }) => {
				saveAs(file, name);
			});
	}

	downloadSelected() {
		this.listSrv.selectionSrv.selection.forEach(exportReq => {
			this.downloadOne(exportReq);
		});
	}
}