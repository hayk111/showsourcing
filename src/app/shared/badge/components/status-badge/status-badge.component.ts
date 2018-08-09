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

	// by default is secondary since is the color for NEW elements
	@Input() type = 'secondary';

	constructor() {
	}

	ngOnInit() {
		if (this.status) {
			switch (this.status.category) {
				case 'inProgress':
					this.type = 'primary';
					break;
				case 'validated':
					this.type = 'success';
					break;
				case 'refused':
					this.type = 'warn';
					break;
				case 'inspiration':
					this.type = 'secondary';
					break;
				default:
					this.type = 'secondary';
					break;
			}
		}
	}

}
