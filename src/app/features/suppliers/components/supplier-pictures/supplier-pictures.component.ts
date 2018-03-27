import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-pictures-app',
	templateUrl: './supplier-pictures.component.html',
	styleUrls: ['./supplier-pictures.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPicturesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
