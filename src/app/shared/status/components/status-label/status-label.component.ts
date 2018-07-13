import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2, ElementRef, AfterContentInit } from '@angular/core';
import { ProductStatus, SupplierStatus } from '~models';
import { Subject, ReplaySubject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'status-label-app',
	templateUrl: './status-label.component.html',
	styleUrls: ['./status-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexCenter'
	}
})
export class StatusLabelComponent implements AfterContentInit {
	@Input() set status(status: ProductStatus | SupplierStatus) {
		this._status = status;
		this.setStyle(status);
	}
	get status() {
		return this._status;
	}
	private _status;
	private _status$ = new ReplaySubject<any>(1);

	constructor(private renderer: Renderer2, private el: ElementRef) {
	}


	ngAfterContentInit() {
		this.setStyle(this._status);
	}

	setStyle(status) {
		if (!this.el.nativeElement || !status)
			return; // not defined before ngAfterViewInit
		this.renderer.setStyle(this.el.nativeElement, 'background', status.color);
		this.renderer.setStyle(this.el.nativeElement, 'color', this.status.contrastColor === 'light' ? '#FFF' : '#555');
	}

}
