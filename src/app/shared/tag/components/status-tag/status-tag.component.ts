import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ProductStatusType, SupplierStatus } from '~models';

@Component({
	selector: 'status-tag-app',
	templateUrl: './status-tag.component.html',
	styleUrls: ['./status-tag.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexCenter]': 'size === "s" || size === "small"',
		'[class.small]': 'size === "s" || size === "small"',
		'[class.medium]': 'size === "m" || size === "medium"',
		'[class.large]': 'size === "l" || size === "large"'
	}
})
export class StatusLabelComponent implements AfterContentInit {

	@Input() size = 's';

	@Input() set status(status: ProductStatusType | SupplierStatus) {
		this._status = status;
		this.setStyle(status);
	}
	get status() {
		return this._status;
	}
	private _status;

	constructor(private renderer: Renderer2, private el: ElementRef) {
	}


	ngAfterContentInit() {
		this.setStyle(this._status);
	}

	setStyle(status) {
		if (!this.el.nativeElement || !status)
			return; // not defined before ngAfterViewInit
		this.renderer.addClass(this.el.nativeElement, 'bg-' + status.color);
		this.renderer.addClass(this.el.nativeElement, 'color-txt-' + this.status.contrastColor);
	}

}
