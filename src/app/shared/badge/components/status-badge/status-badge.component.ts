import {
	AfterViewInit, AfterContentInit, ChangeDetectionStrategy,
	Component, ElementRef, Input, Renderer2, ViewChild
} from '@angular/core';
import { ProductStatusType, SupplierStatus } from '~models';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent implements AfterViewInit {
	@Input() size = 's';

	@Input() set status(status: ProductStatusType | SupplierStatus) {
		this._status = status;
		this.setStyle(status);
	}
	get status() {
		return this._status;
	}
	private _status;

	@ViewChild('badge', { read: ElementRef }) badge: ElementRef<BadgeComponent>;

	constructor(private renderer: Renderer2) {
	}


	ngAfterViewInit() {
		this.setStyle(this._status);
	}

	setStyle(status) {
		if (!this.badge.nativeElement || !status)
			return; // not defined before ngAfterViewInit
		this.renderer.addClass(this.badge.nativeElement, 'bg-' + status.color);
		this.renderer.addClass(this.badge.nativeElement, 'color-txt-' + this.status.contrastColor);
	}

}
