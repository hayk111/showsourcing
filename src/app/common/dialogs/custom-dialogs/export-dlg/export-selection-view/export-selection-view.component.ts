import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ExportEntity, ExportFormat, ExportType } from '../export-dlg.component';
import { EntityName } from '~core/erm/models';


@Component({
	selector: 'export-selection-view-app',
	templateUrl: './export-selection-view.component.html',
	styleUrls: ['./export-selection-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportSelectionViewComponent implements OnInit {

	@Input() targets: ExportEntity[];
	@Input() length: number;
	@Input() canExportPdf: boolean;
	@Input() type: EntityName;
	@Input() canExportImages: boolean;
	@Output() export = new EventEmitter<null>();
	@Output() selected = new EventEmitter<{ format: ExportFormat, type: ExportType }>();

	selectedFormat: ExportFormat;
	selectedType: ExportType;

	constructor() { }

	ngOnInit() {
	}

	selectXls() {
		this.select('xls', ('xls_' + this.type + '_list' as ExportType));
	}

	selectPdf() {
		this.select('pdf', ('pdf_' + this.type + '_page' as ExportType));
	}

	selectPictures() {
		this.select('pictures', (this.type + '_image' as ExportType));
	}

	private select(format: ExportFormat, type: ExportType) {
		this.selectedFormat = format;
		this.selectedType = type;
		this.selected.emit({ format: this.selectedFormat, type: this.selectedType });
	}
}
