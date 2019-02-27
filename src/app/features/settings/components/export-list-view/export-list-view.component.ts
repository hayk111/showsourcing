import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, ExportRequest } from '~core/models';

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
	@Output() download = new EventEmitter<string>();

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	constructor() { super(); }

}
