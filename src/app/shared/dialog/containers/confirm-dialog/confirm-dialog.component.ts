import { ChangeDetectionStrategy, Component } from '@angular/core';

import { addDialog } from '../../models/dialog-component-map.const';
import { DialogName } from '../../models/dialog-names.enum';
import { DialogService } from '~shared/dialog/services/dialog.service';


const addDlg = () => addDialog(ConfirmDialogComponent, DialogName.CONFIRM);

@Component({
	selector: 'confirm-dialog-app',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
	dlgName = DialogName.CONFIRM;
	// props: { text: string, callback: Function };
	text: string;
	callback: Function;

	constructor(protected srv: DialogService) { }

	onConfirm() {
		this.callback();
		this.srv.close(this.dlgName);
	}

}

addDlg();

