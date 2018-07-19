import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ProductStatusType, SupplierStatus } from '~models';

@Component({
	selector: 'status-label-app',
	templateUrl: './status-label.component.html',
	styleUrls: ['./status-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.flexCenter]': 'labelSize === "s" || labelSize === "small"',
		'[class.small]': 'labelSize === "s" || labelSize === "small"',
		'[class.medium]': 'labelSize === "m" || labelSize === "medium"',
		'[class.large]': 'labelSize === "l" || labelSize === "large"'
	}
})
export class StatusLabelComponent implements AfterContentInit {

	@Input() labelSize = 's';
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
