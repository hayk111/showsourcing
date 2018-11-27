import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category, ERM, Product, Supplier } from '~models';

@Component({
	selector: 'preview-badges-app',
	templateUrl: './preview-badges.component.html',
	styleUrls: ['./preview-badges.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewBadgesComponent implements OnInit {

	/** array of names for icons that are going to be displayed */
	@Input() badges: ERM[];
	/** supplier only if it's on the badge list, location will be extracted from supplier */
	@Input() supplier: Supplier;
	/** product only if it's on the badge list */
	@Input() product: Product;
	/** categories only if it's on the badge list */
	@Input() category: Category[];

	erm = ERM;

	constructor() { }

	ngOnInit() {
		const ba = 'product';
		const a = this.badges.includes(ba);
		console.log(a);
	}

}
