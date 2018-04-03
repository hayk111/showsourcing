import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils';
import { DialogName } from '../../models/dialog-names.enum';
import { DialogActions } from '~app/shared/dialog/store/dialog.action';

// This is merely a presentational component. The logic for displaying a component is in the container
@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent extends AutoUnsub implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Input() hasFooter = true;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
	}

	close() {
		this.store.dispatch(DialogActions.close(this.name));
	}
}
