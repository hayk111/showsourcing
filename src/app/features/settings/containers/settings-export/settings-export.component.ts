import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ExportRequestService } from '~core/entity-services/export-request/export-request.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'settings-export-app',
	templateUrl: './settings-export.component.html',
	styleUrls: ['./settings-export.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsExportComponent extends TrackingComponent implements OnInit {

	erm = ERM;

	constructor(
		private datePipe: DatePipe,
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


	transformDate(date) {
		return this.datePipe.transform(date, 'yyy-MM-ddThh:mm:ss');
	}

	downloadOne(exportReq: ExportRequest) {
		if (exportReq.status === 'ready') {
			const extension = exportReq.documentUrl.split('.').pop();
			saveAs(exportReq.documentUrl, exportReq.format + '_' + this.transformDate(exportReq.creationDate) + '.' + extension);
		}
	}

	downloadSelected() {
		this.listSrv.selectionSrv.selection.forEach(exportReq => {
			this.downloadOne(exportReq);
		});
	}

}
