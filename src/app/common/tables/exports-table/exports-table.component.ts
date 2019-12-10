import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';
import { defaultConfig } from '../default-columns/default-config';

type ExportStatus = 'ready' | 'pending' | 'processing' | 'failed' | 'done' | 'error';

const tableConfig: TableConfig = {
	...defaultConfig,
	fileName: { name: 'fileName', translationKey: 'file-name', width: 190, sortProperty: 'documentUrl' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status' },
	download: { name: 'download', translationKey: 'action', width: 100, sortable: false },
};

@Component({
	selector: 'exports-table-app',
	templateUrl: './exports-table.component.html',
	styleUrls: [
		'./exports-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportTableComponent extends EntityTableComponent<ExportRequest> {
	columns = ['logo', 'fileName', 'status',  'createdBy', 'creationDate', 'download'];
	@Output() showItemsPerPage = new EventEmitter<number>();
	@Output() download = new EventEmitter<ExportRequest>();
	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	erm = ERM;
	tableConfig = tableConfig;

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