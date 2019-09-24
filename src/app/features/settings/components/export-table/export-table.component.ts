import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'export-table-app',
	templateUrl: './export-table.component.html',
	styleUrls: [
		'./export-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportTableComponent extends EntityTableComponent<ExportRequest> {

	erm = ERM;
	@Output() download = new EventEmitter<ExportRequest>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor(
		public translate: TranslateService
	) { super(); }

	getToolTipMsg(status: string) {
		// return status !== 'ready' ? translate('Your export is being processed') : null;
		return status !== 'ready' ? this.translate.instant('message.your-export-is-being-processed') : null;
	}

}
