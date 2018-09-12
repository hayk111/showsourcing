import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supplier } from '~models';
import { DEFAULT_IMG } from '~utils';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';

@Component({
	selector: 'supplier-card-app',
	templateUrl: './supplier-card.component.html',
	styleUrls: ['./supplier-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent extends TrackingComponent implements OnInit {

	@Input() supplier: Supplier;
	defaultImg = DEFAULT_IMG;

	constructor(private router: Router) {
    super();
  }

	ngOnInit() { }

	goToSupplier() {
		this.router.navigate(['supplier', 'details', this.supplier.id]);
	}
}
