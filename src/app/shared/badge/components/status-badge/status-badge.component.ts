import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityMetadata, SampleStatus, SupplierStatus, ProductStatus } from '~models';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent implements OnInit {

	@Input() size = 's';
	/** @deprecated */
	@Input() round = true;

	@Input() status: ProductStatus | SupplierStatus | SampleStatus;
	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;

	constructor() {
	}

	ngOnInit() {

	}

	get type() {
		// by default is secondary since is the color for NEW elements
		if (this.status) {
			switch (this.status.category) {
				case 'inProgress':
					return 'in-progress';
				case 'validated':
					return 'success';
				case 'refused':
					return 'warn';
				case 'inspiration':
					return 'secondary-light';
				default:
					return 'secondary';
			}
		}
	}

}
