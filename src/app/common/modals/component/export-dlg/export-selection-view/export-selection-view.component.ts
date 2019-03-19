import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product, Supplier } from '~core/models';

type ExportFormat = 'pdf' | 'xls' | 'pictures';
type ExportType = 'pdf_product_page' | 'xls_product_list' | 'product_image';

@Component({
	selector: 'export-selection-view-app',
	templateUrl: './export-selection-view.component.html',
	styleUrls: ['./export-selection-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportSelectionViewComponent implements OnInit {

	@Input() targets: Product[] | Supplier[];
	@Output() export = new EventEmitter<null>();
	@Output() selected = new EventEmitter<{ format: ExportFormat, type: ExportType }>();

	selectedFormat: ExportFormat;
	selectedType: ExportType;

	constructor() { }

	ngOnInit() {
	}

	select(format: ExportFormat, type: ExportType) {
		this.selectedFormat = format;
		this.selectedType = type;
		this.selected.emit({ format: this.selectedFormat, type: this.selectedType });
	}
}
