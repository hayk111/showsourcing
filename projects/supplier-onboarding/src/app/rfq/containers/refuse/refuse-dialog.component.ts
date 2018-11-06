import { Component } from '@angular/core';
import { DialogService } from '~shared/dialog';


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
