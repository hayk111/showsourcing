import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~core/models';

@Component({
	selector: 'selector-supplier-row-app',
	templateUrl: './selector-supplier-row.component.html',
	styleUrls: ['./selector-supplier-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorSupplierRowComponent implements OnInit {

	@Input() supplier: Supplier;

	constructor() { }

	ngOnInit() {
	}

}
