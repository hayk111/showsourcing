import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-export-dlg-app',
	templateUrl: './product-export-dlg.component.html',
	styleUrls: ['./product-export-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductExportDlgComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
