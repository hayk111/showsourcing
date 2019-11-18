import { Component } from '@angular/core';
import { DialogService } from '~shared/dialog/services';


@Component({
	selector: 'rfq-refuse-dialog-app',
	templateUrl: './refuse-dialog.component.html',
	styleUrls: ['./refuse-dialog.component.scss'],
})
export class RefuseDialogComponent {

	constructor(
		private dlgSrv: DialogService
	) {}

	refuse() {

	}

	cancel() {
		this.dlgSrv.close();
	}
}
