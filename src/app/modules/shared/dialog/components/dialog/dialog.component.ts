import { Component, OnInit, Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DialogService } from '../../services/dialog.service';
import { DialogNames } from '../../dialogs.enum';

@Component({
	selector: 'dialog-app',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
	@Input() closeIcon = true;
	@Input() name: DialogNames;
	isOpen: Subject<boolean>;

	constructor(private dlgSer: DialogService) { }

	ngOnInit() {
		if (!this.name)
			throw Error(`You haven't given a name to your dialog. Example [name]="'dlg1'"`);
		this.isOpen = this.dlgSer.registerDialog(this.name);
	}

	ngOnDestroy() {
		this.dlgSer.unregisterDialog(this.name);
	}

	close() {
		this.dlgSer.close(this.name);
	}

}
