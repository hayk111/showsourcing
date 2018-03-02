import { Store } from '@ngrx/store';
import { DialogName, DialogActions } from '~shared/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'selection-actions',
	templateUrl: './selection-actions.component.html',
	styleUrls: ['./selection-actions.component.scss'],
})
export class SelectionActionsComponent implements OnInit {
	public dialogName: DialogName = DialogName.ADDTOPROJECT;
	constructor(private store: Store<any>) {}

	ngOnInit() {}

	public addToProject() {
		this.store.dispatch(DialogActions.open(this.dialogName));
	}
}
