import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
} from '@angular/core';
import { Supplier } from '~app/features/suppliers';
import { Router } from '@angular/router';

@Component({
	selector: 'supplier-card-app',
	templateUrl: './supplier-card.component.html',
	styleUrls: ['./supplier-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent implements OnInit {
	@Input() supplier: Supplier;

	constructor(private router: Router) {}

	ngOnInit() {}

	goToSupplier() {}
}
