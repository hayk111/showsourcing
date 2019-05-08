import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService, CloseEventType } from '~shared/dialog';
import { RequestTemplate } from '~core/models';

@Component({
	selector: 'template-mngmt-dlg-app',
	templateUrl: './template-mngmt-dlg.component.html',
	styleUrls: ['./template-mngmt-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateMngmtDlgComponent implements OnInit {

	templateSelected: RequestTemplate;

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	close(event: MouseEvent) {
		event.stopPropagation();
		this.dlgSrv.close({ type: CloseEventType.OK, data: { template: this.templateSelected } });
	}

}
