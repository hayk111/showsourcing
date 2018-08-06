import {
	AfterViewInit, AfterContentInit, ChangeDetectionStrategy,
	Component, ElementRef, Input, Renderer2, ViewChild, OnInit
} from '@angular/core';
import { ProductStatusType, SupplierStatusType } from '~models';
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

	constructor() {
	}

	ngOnInit() {
		// switch (this.status.)
	}


}
