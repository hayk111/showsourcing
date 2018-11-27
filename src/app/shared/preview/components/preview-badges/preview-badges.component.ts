import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category, ERM, Product, Supplier, EntityMetadata } from '~models';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';

@Component({
	selector: 'preview-badges-app',
	templateUrl: './preview-badges.component.html',
	styleUrls: ['./preview-badges.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBadgesComponent implements OnInit {

	/** array of names for icons that are going to be displayed */
	@Input() badges: EntityMetadata[];
	/** supplier only if it's on the badge list, location will be extracted from supplier */
	@Input() supplier: Supplier;
	/** product only if it's on the badge list */
	@Input() product: Product;
	/** categories only if it's on the badge list */
	@Input() category: Category[];

	erm = ERM;

	constructor(private constPipe: ConstPipe) { }

	ngOnInit() {
	}

	getSupplierLocation() {
		let locName = '-';
		if (this.supplier) {
			if (this.supplier.city && this.supplier.country)
				locName = this.supplier.city + ', ' + this.constPipe.transform(this.supplier.country, 'country');
			else if (this.supplier.city)
				locName = this.supplier.city;
			else
				locName = this.supplier.country;
		}
	}
}
