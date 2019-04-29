import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { DialogService, CloseEventType } from '~shared/dialog';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'description-dlg-app',
	templateUrl: './description-dlg.component.html',
	styleUrls: ['./description-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionDlgComponent implements AfterViewInit {

	@Input() description: string;

	@ViewChild(InputDirective) txtArea: InputDirective;

	constructor(private dlgSrv: DialogService) { }

	ngAfterViewInit() {
		this.txtArea.focus();
	}

	save() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { description: this.description } });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

}
