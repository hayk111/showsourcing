import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '~shared/dialog/services/dialog.service';
import { CloseEventType } from '~shared/dialog/interfaces';

@Component({
	selector: 'confirm-dialog-app',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
	// text displayed
	text: string;

	constructor(protected srv: DialogService) { }

	onConfirm() {
		this.srv.close({ type: CloseEventType.OK });
	}

}
