import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~entity';

@Component({
	selector: 'supplier-summary-app',
	templateUrl: './supplier-summary.component.html',
	styleUrls: ['./supplier-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierSummaryComponent implements OnInit {
	@Input() supplier: Supplier;
	@Input() productsCount: number;
	@Input() numTasks: number;
	constructor() { }

	ngOnInit() { }
}
