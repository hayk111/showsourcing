import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityMetadata, SampleStatus, SupplierStatus, ProductStatus } from '~models';

@Component({
	selector: 'status-box-app',
	templateUrl: './status-box.component.html',
	styleUrls: ['./status-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBoxComponent implements OnInit {

	@Input() size = 's';

	private _status: ProductStatus | SupplierStatus | SampleStatus;
	@Input() set status(value: ProductStatus | SupplierStatus | SampleStatus) {
		this._status = value
	}
	get status() {
		return this._status;
	}

	@Input() round = true;

	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;
	// if we display the caret down or not
	@Input() hasArrow = false;
	@Input() type: ('list' | 'badge') = 'badge';

	constructor() {
	}

	ngOnInit() {

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
