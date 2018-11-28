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
	@Input() set badges(badges: EntityMetadata[]) {
		badges.forEach(badge => {
			this.badgesMap.set(badge, true);
		});
	}
	/** supplier only if it's on the badge list, location will be extracted from supplier */
	@Input() entity: any;

	erm = ERM;

	/** Map that indicates the badges that we have */
	badgesMap = new Map();

	constructor(private constPipe: ConstPipe) { }

	ngOnInit() {
	}

	getSupplierLocation() {
		let locName = '-';
		if (this.entity) {
			if (this.entity.city && this.entity.country)
				locName = this.entity.city + ', ' + this.constPipe.transform(this.entity.country, 'country');
			else if (this.entity.city)
				locName = this.entity.city;
			else
				locName = this.constPipe.transform(this.entity.country, 'country');
		}
		return locName;
	}
}
