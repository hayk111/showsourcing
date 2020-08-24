import { ChangeDetectionStrategy, Component, Input, ViewChild, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CloseEventType, DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'description-dialog-app',
	templateUrl: './description-dialog.component.html',
	styleUrls: ['./description-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionDlgComponent implements OnInit {

	private _description: string;
	@Input() set description(description: string) {
		this._description = description;
		// assert value instead in case we don't update txtAreaDesc
		if (this.txtAreaDesc === undefined) {
			this.txtAreaDesc = description;
		}
	}
	get description() {
		return this._description;
	}
	@Input() editingMode = true;

	// if we are editing or not
	editing$ = new ReplaySubject();
	// to store the value of the txtArea, since sometimes we will cancel instead of save, this way we don't override initial description
	txtAreaDesc: string;

	@ViewChild(InputDirective, { static: true }) txtArea: InputDirective;

	constructor(private dlgSrv: DialogService) {}

	ngOnInit() {
		this.toggleEdition(this.editingMode);
	}

	toggleEdition(state = false) {
		this.editing$.next(state);
		if (state)
			this.txtArea.focus();
	}

	save() {
		const description = this.txtAreaDesc.trim();
		this.dlgSrv.data({description});
		this.dlgSrv.close();
	}

	cancel() {
		this.dlgSrv.cancel();
	}

}