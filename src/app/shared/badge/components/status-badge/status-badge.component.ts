import {
	AfterViewInit, AfterContentInit, ChangeDetectionStrategy,
	Component, ElementRef, Input, Renderer2, ViewChild, OnInit
} from '@angular/core';
import { ProductStatusType, SupplierStatus } from '~models';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent implements OnInit {
	@Input() size = 's';

	@Input() status: ProductStatusType | SupplierStatus;

	constructor() {
	}

	ngOnInit() {
		// switch (this.status.)
	}


}
