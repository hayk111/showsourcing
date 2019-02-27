import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ExportRequestService } from '~core/entity-services/export-request/export-request.service';
import { ListPageService, ListPageKey } from '~core/list-page';
import { ExportRequest, ERM } from '~core/models';
import { CommonModalService } from '~common/modals';
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
		private exportSrv: ExportRequestService,
		public listSrv: ListPageService<ExportRequest, ExportRequestService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.EXPORT,
			entitySrv: this.exportSrv,
			searchedFields: ['creationDate'],
			entityMetadata: ERM.EXPORT_REQUEST,
			initialFilters: []
		});
	}

}
