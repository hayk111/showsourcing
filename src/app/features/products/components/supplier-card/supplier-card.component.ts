import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '~supplier';

@Component({
	selector: 'supplier-card-app',
	templateUrl: './supplier-card.component.html',
	styleUrls: ['./supplier-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent implements OnInit {
	@Input() supplier: Supplier;

	constructor(private router: Router) { }

	ngOnInit() { }

	goToSupplier() { }
}
