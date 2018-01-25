import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ElementRef } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { selectDialog } from '../../../../store/selectors/ui/dialog.selector';

@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent extends AutoUnsub implements OnInit {
	@Input() closeIcon = true;
	@Input() name: DialogName;
	@Output() registered = new EventEmitter<string>();
	@Output() closed = new EventEmitter();
	isOpen$: Observable<boolean>;
	isOpen: boolean;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
		this.store.dispatch(DialogActions.register(this.name));
		this.isOpen$ = this.store.select(selectDialog(this.name))
		.map(dlgInfo => dlgInfo.open);
		this.isOpen$.takeUntil(this._destroy$).subscribe(open => this.isOpen = open);
		this.registered.emit(this.name);
	}

	close() {
		this.store.dispatch(DialogActions.close(this.name));
	}


}
