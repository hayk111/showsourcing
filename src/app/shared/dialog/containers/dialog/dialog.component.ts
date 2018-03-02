import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { DialogName } from '../../models/dialog-names.enum';
import { DialogActions } from '../../store/actions/dialog.action';
import { selectDialog } from '../../store/selectors/dialog.selector';
import { Observable } from 'rxjs/Observable';
import { ElementRef } from '@angular/core';
import { AutoUnsub } from '~utils/index';
import { takeUntil } from 'rxjs/operators';

// Doctor: "I'm sorry but you suffer from a terminal illness and have only 10 to live."
// Patient: "What do you mean, 10? 10 what? Months? Weeks?!"
// Doctor: "Nine.."

@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends AutoUnsub implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Output() closed = new EventEmitter();
	isOpen$: Observable<boolean>;
	isOpen: boolean;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		if (!this.name) throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
		// we first have to register the dialog so it's added to the map in store
		this.store.dispatch(DialogActions.register(this.name));
		// check if dlg is open
		this.isOpen$ = this.store.select(selectDialog(this.name)).map(dlgInfo => dlgInfo.open);
		this.isOpen$.pipe(takeUntil(this._destroy$)).subscribe(open => {
			this.isOpen = open;
		});
	}

	close() {
		this.store.dispatch(DialogActions.close(this.name));
	}
}
