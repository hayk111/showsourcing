import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

type ExportStatus = 'ready' | 'pending' | 'processing' | 'failed' | 'done' | 'error';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'file-name', width: 190, sortProperty: 'documentUrl' },
	status: { name: 'status', translationKey: 'status', width: 150, sortProperty: 'status' },
	download: { name: 'download', translationKey: 'action', width: 100, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 190, sortProperty: 'createdBy.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 190, sortProperty: 'creationDate' },
};

@Component({
	selector: 'exports-table-app',
	templateUrl: './exports-table.component.html',
	styleUrls: [
		'./exports-table.component.scss',
		'../table.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportTableComponent extends EntityTableComponent<ExportRequest> {
	columns = ['name', 'status', 'download', 'createdBy', 'createdOn'];
	@Output() download = new EventEmitter<ExportRequest>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	erm = ERM;
	tableConfig = tableConfig;

	constructor(
		public translate: TranslateService
	) { super(); }

	getFileName(path: string) {
		const split = path.split('/');
		return split[split.length - 1];
	}

	getStatusColor(status: ExportStatus) {
		switch (status) {
			case 'processing':
			case 'pending':
				return 'var(--color-txt-secondary)';
			case 'error':
			case 'failed':
				return 'var(--color-warn)';
			case 'ready':
			case 'done':
				return 'var(--color-success)';
		}
	}

	getToolTipMsg(status: string) {
		return status !== 'ready' ? this.translate.instant('message.your-export-is-being-processed') : null;
	}

}
