import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExportEntity, ExportFormat } from '../export-dialog.component';
import { EntityName } from '~core/erm';

@Component({
	selector: 'export-selection-view-app',
	templateUrl: './export-selection-view.component.html',
	styleUrls: ['./export-selection-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportSelectionViewComponent {

	@Input() count: number;
	@Input() canExportPdf: boolean;
	@Input() canExportImages: boolean;
	@Output() export = new EventEmitter<null>();
	@Output() selected = new EventEmitter<{ format: ExportFormat }>();

	selectedFormat: ExportFormat;
	// to use enum in template
	exportFormat = ExportFormat;

	constructor() { }

	select(format: ExportFormat) {
		this.selectedFormat = format;
		this.selected.emit({ format: this.selectedFormat });
	}
}
