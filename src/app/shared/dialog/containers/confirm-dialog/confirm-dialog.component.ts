import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addDialog } from '../../models/dialog-component-map.const';
import { DialogName } from '../../models/dialog-names.enum';
import { DialogActions } from '../../store/dialog.action';


const addDlg = () => addDialog(ConfirmDialogComponent, DialogName.CONFIRM);

@Component({
	selector: 'confirm-dialog-app',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
	dlgName = DialogName.CONFIRM;
	props: { text: string, callback: Function };

	constructor(protected store: Store<any>) { }

	onConfirm() {
		this.props.callback();
		this.store.dispatch(DialogActions.close(this.dlgName));
	}

}

addDlg();

