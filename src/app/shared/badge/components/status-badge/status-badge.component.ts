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

	@Input() status: ProductStatus | SupplierStatus | SampleStatus;
	@Input() round = true;

	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;
	// if we display the caret down or not
	@Input() hasArrow = false;

	constructor() {
	}

	ngOnInit() {

	}

	get getType() {
		// by default is secondary since is the color for NEW elements
		let type = 'secondary';
		if (this.status) {
			switch (this.status.category) {
				case 'inProgress':
					type = 'in-progress';
					break;
				case 'validated':
					type = 'success';
					break;
				case 'refused':
					type = 'warn';
					break;
				case 'inspiration':
					type = 'secondary-light';
					break;
				default:
					type = 'secondary';
					break;
			}
		}
		return type;
	}

}
