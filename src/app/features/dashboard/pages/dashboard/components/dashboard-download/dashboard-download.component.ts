import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DownloadDlgComponent } from '~common/dialogs/custom-dialogs';
import { CloseEventType, DialogService } from '~shared/dialog';

@Component({
	selector: 'dashboard-download-app',
	templateUrl: './dashboard-download.component.html',
	styleUrls: ['./dashboard-download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDownloadComponent implements OnInit {

	constructor(
		private dlgSrv: DialogService,
	) { }

	ngOnInit() {
	}

	openModal() {
		this.dlgSrv.open(DownloadDlgComponent).subscribe();
	}

}
