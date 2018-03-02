import { Store } from '@ngrx/store';
import { DialogName, DialogActions } from '~shared/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'selection-actions',
	templateUrl: './selection-actions.component.html',
	styleUrls: ['./selection-actions.component.scss'],
})
export class SelectionActionsComponent implements OnInit {
	public addProductDialog: DialogName = DialogName.ADDTOPROJECT;
	public exportDialog: DialogName = DialogName.EXPORT;
	public requestFeatureDialog: DialogName = DialogName.REQUESTFEEDBACK;
	constructor(private store: Store<any>) {}

	ngOnInit() {}

	public addToProject() {
		this.store.dispatch(DialogActions.open(this.addProductDialog));
	}
	public export() {
		this.store.dispatch(DialogActions.open(this.exportDialog));
	}
	public requestFeedback() {
		this.store.dispatch(DialogActions.open(this.requestFeatureDialog));
	}
}
