import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, ContentChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DialogActions } from '../../store/dialog.action';
import { AutoUnsub } from '~utils';

import { DialogName } from '../../models/dialog-names.enum';
import { DialogHeaderComponent } from '~app/shared/dialog/containers/dialog-header/dialog-header.component';
import { DialogFooterComponent } from '~app/shared/dialog/containers/dialog-footer/dialog-footer.component';

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
	@Output() close = new EventEmitter<any>();
	@ContentChild(DialogFooterComponent) footer: DialogFooterComponent;
	@ContentChild(DialogHeaderComponent) header: DialogHeaderComponent;


	get hasFooter() {
		return !!this.footer;
	}

	get hasHeader() {
		return !!this.header;
	}

	constructor(private store: Store<any>) { }

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
	}

	doClose() {
		this.store.dispatch(DialogActions.close(this.name));
		this.close.emit();
	}
}
