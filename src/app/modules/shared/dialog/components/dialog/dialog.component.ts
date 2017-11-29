import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { DialogName } from '../../../../store/model/dialog.model';
import { DialogActions } from '../../../../store/action/dialog.action';
import { selectDialog } from '../../../../store/selectors/dialog.selector';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Output() registered = new EventEmitter<string>();
	isOpen$: Observable<boolean>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
		this.isOpen$ = this.store.select(selectDialog(this.name)).map(dlgInfo => dlgInfo.open);
		this.store.dispatch(DialogActions.register(this.name));
		this.registered.emit(this.name);
	}

	close() {
		this.store.dispatch(DialogActions.close(this.name));
	}

}
