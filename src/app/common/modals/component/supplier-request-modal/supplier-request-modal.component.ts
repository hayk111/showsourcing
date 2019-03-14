import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-request-modal-app',
	templateUrl: './supplier-request-modal.component.html',
	styleUrls: ['./supplier-request-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestModalComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
