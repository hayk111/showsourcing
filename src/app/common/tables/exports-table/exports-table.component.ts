import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ERM, ExportRequest } from '~core/orm/models';
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
		private datePipe: DatePipe,
		public translate: TranslateService
	) { super(); }

	getFileName(row: any): string {
		if (!row) {
			return '';
		}
		const { type, format, creationDate } = row;

		const firstUnderscoreIndex = type.indexOf('_');
		const secondUnderscoreIndex = type.indexOf('_', firstUnderscoreIndex + 1);

		const entityType = secondUnderscoreIndex !== -1
			? type.substring(firstUnderscoreIndex + 1, secondUnderscoreIndex)
			: type.substring(0, firstUnderscoreIndex);

		return `${entityType}-${format}-${this.datePipe.transform(creationDate, 'yyy-MM-dd hh:mm')}`;
	}

	getToolTipMsg(status: string) {
		return status !== 'ready' ? this.translate.instant('message.your-export-is-being-processed') : null;
	}

}
