import {
	AfterViewInit, AfterContentInit, ChangeDetectionStrategy,
	Component, ElementRef, Input, Renderer2, ViewChild, OnInit
} from '@angular/core';
import { ProductStatusType, SupplierStatusType, EntityMetadata } from '~models';
import { BadgeComponent } from '../badge/badge.component';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent implements OnInit {
	@Input() size = 's';

	@Input() status: ProductStatusType | SupplierStatusType;

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
