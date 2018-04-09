import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogActions } from '../../store/dialog.action';
import { AutoUnsub } from '~utils';

import { DialogName } from '../../models/dialog-names.enum';

// This is merely a presentational component. The logic for displaying a component is in the container
@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Input() hasFooter = true;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
	}

	close() {
		this.store.dispatch(DialogActions.close(this.name));
	}
}
