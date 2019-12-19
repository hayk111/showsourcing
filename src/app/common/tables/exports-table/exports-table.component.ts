import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ERM, ExportRequest } from '~core/models';
import { EntityTableComponent } from '../entity-table.component';
import { config } from './config';
import { EntityTableComponent } from '../entity-table.component';


@Component({
	selector: 'exports-table-app',
	templateUrl: './exports-table.component.html',
	styleUrls: [
		'./exports-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportTableComponent extends EntityTableComponent<ExportRequest> {
	static DEFAULT_COLUMNS = ['logo', 'fileName', 'createdBy', 'status', 'download'];
	static DEFAULT_TABLE_CONFIG = config;
	@Input() columns = ExportTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ExportTableComponent.DEFAULT_TABLE_CONFIG;
	@Output() showItemsPerPage = new EventEmitter<number>();
	@Output() download = new EventEmitter<ExportRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;
	erm = ERM;

	constructor(
		public translate: TranslateService
	) { super(); }

	getFileName(path: string): string {
		if (!path) {
			return '';
		}

		const split = path.split('/');
		return split[split.length - 1];
	}

	getToolTipMsg(status: string) {
		return status !== 'ready' ? this.translate.instant('message.your-export-is-being-processed') : null;
	}

}
