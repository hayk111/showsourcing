import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';
import { TranslateService } from '@ngx-translate/core';

type ExportStatus = 'ready' | 'pending' | 'processing' | 'failed' | 'done';

@Component({
	selector: 'export-list-view-app',
	templateUrl: './export-list-view.component.html',
	styleUrls: [
		'./export-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportListViewComponent extends ListViewComponent<ExportRequest> {

	erm = ERM;
	@Output() download = new EventEmitter<ExportRequest>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor(
		public translate: TranslateService
	) { super(); }

	getFileName(path: string) {
		const split = path.split('/');
		return split[split.length - 1];
	}

	getStatusColor(status: ExportStatus) {
		switch (status) {
			case 'ready':
			case 'processing':
			case 'pending':
				return 'var(--color-txt-secondary)';
			case 'failed':
				return 'var(--color-warn)';
			case 'done':
				return 'var(--color-success)';
		}
	}

	getToolTipMsg(status: string) {
		// return status !== 'ready' ? translate('Your export is being processed') : null;
		return status !== 'ready' ? this.translate.instant('message.your-export-is-being-processed') : null;
	}

}
