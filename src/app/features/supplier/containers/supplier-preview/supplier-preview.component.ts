import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
