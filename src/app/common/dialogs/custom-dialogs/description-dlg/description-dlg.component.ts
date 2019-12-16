import { OnChanges, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CloseEventType, DialogService } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'description-dlg-app',
	templateUrl: './description-dlg.component.html',
	styleUrls: ['./description-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionDlgComponent {

	private _description: string;
	@Input() set description(description: string) {
		this._description = description;
		// if the description is empty that means editing is true
		this.toggleEdition(!(this.description && this.description.length));
	}
	get description() {
		return this._description;
	}
	// if we are editing or not
	editing$ = new BehaviorSubject(false);
	// to store the value of the txtArea, since sometimes we will cancel instead of save, this way we don't override initial description
	txtAreaDesc: string;

	@ViewChild(InputDirective, { static: true }) txtArea: InputDirective;

	constructor(private dlgSrv: DialogService) { }

	toggleEdition(state = false) {
		this.editing$.next(state);
		if (state)
			this.txtArea.focus();
	}

	save() {
		this.description = this.txtAreaDesc.trim();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { description: this.description } });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

}
