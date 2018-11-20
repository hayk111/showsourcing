import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-samples-app',
	templateUrl: './supplier-samples.component.html',
	styleUrls: ['./supplier-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierSamplesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
