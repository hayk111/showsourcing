import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DialogService } from '~shared/dialog/services/dialog.service';


@Component({
	selector: 'confirm-dialog-app',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
	// text displayed
	text: string;
	callback: Function;

	constructor(protected srv: DialogService) { }

	onConfirm() {
		this.callback();
		this.srv.close(ConfirmDialogComponent);
	}

}
