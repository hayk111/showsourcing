import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityMetadata, SampleStatus, SupplierStatus, ProductStatus } from '~models';

@Component({
	selector: 'status-box-app',
	templateUrl: './status-box.component.html',
	styleUrls: ['./status-box.component.scss']
})
export class StatusBoxComponent implements OnInit {

	@Input() size = 's';

	@Input() displayAttribute: 'name' | 'category' = 'name';

	@Input() status: ProductStatus | SupplierStatus | SampleStatus;

	@Input() round = true;

	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;
	@Input() type: ('list' | 'badge') = 'badge';

	constructor() {
	}

	ngOnInit() {
	}

	isHaveStatus() {
		return this.status && this.status.category !== 'new';
	}

	getType() {
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
