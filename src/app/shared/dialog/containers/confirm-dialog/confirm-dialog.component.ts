import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogName } from '~app/shared/dialog/models/dialog-names.enum';
import { addDialog } from '~app/shared/dialog/models/dialog-component-map.const';
import { Store } from '@ngrx/store';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';


const addDlg = () => { console.error('adding'); addDialog(ConfirmDialogComponent, DialogName.CONFIRM); };

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

